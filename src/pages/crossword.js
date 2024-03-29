import 'fontsource-raleway';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import _ from 'lodash';
import parse from '@dylanarmstrong/puz';
import styled from 'styled-components';

import Clues from '../components/Clues'
import Keyboard from '../components/Keyboard';
import Puzzle from '../components/Puzzle';
import Background from "../components/background"
import useLocalStorage from '../hooks/useLocalStorage';

import { CELL_SIZE } from '../components/Cell';
import {
  FILL,
  SET_PUZ,
  SET_SELECTED,
  initialState,
  reducer,
} from '../reducer';
import { colors } from '../css';
import Layout from '../components/layout';

// Stop props from bleeding through to DOM
const Empty = styled.div``;
// eslint-disable-next-line no-unused-vars, react/jsx-props-no-spreading
const PuzzleContainer = styled(({ width, ...props }) => <Empty {...props} />)`
  // display: grid;
  // grid-template-columns: auto;

  // @media (min-width: 1200px) {
  //   grid-template-columns: calc(${(props) => props.width} * ${CELL_SIZE}px + 20px) auto auto;
  // }

  // @media print {
  //   grid-template-columns: auto;
  // }
`; // ` Mess with Github syntax highlighting

const FileContainer = styled.div`
  margin-top: 5px;
  background-color: #fafafa;
  border: 5px dashed #1f1f1f;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2.5rem;
  color: ${colors.black};
`;

const File = styled.input``;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 95%;
  outline: none;

  // @media (min-width: 576px) {
  //   max-width: 540px;
  // }
  // @media (min-width: 768px) {
  //   max-width: 720px;
  // }
  // @media (min-width: 992px) {
  //   max-width: 960px;
  // }
  // @media (min-width: 1200px) {
  //   max-width: 1140px;
  // }
`;

const Header = styled.h2`
  width: 100%;
  margin: 0;
  padding-bottom: 20px;
`;

const Byline = styled.h5`
  margin: 0;
  margin-bottom: 0.5rem;
`;

const PuzzleTitle = styled.span`
  font-size: 2rem;
  color: #D72E25;
`

const PuzzleAuthor = styled.span`
  font-size: 1.5rem;
  color: #666666;
`

const reader = new FileReader();

const readPuz = (e) => {
  const [file] = e.target.files;
  reader.readAsArrayBuffer(file);
};

const Keys = {
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  BACKSPACE: 8,
};

const Crossword = () => {
  const [save, setSave] = useLocalStorage('save', {});
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    save,
    setSave,
  });

  reader.onload = () => {
    dispatch({
      data: {
        puz: parse(new Uint8Array(reader.result)),
      },
      type: SET_PUZ,
    });
  };

  const { author, copyright, grid, height, mode, selected, title, width } = state;
  const byline = [title, author, copyright].filter(Boolean).join(' ');

  const getCell = useCallback((x, y) => grid[y][x], [grid]);
  const getCellByClue = useCallback((clueIndex) => {
    for (let y = 0, yLen = grid.length; y < yLen; y++) {
      const row = grid[y];
      for (let x = 0, xLen = row.length; x < xLen; x++) {
        const col = row[x];
        if (col.clueIndex === clueIndex) {
          return col;
        }
      }
    }
    return null;
  }, [grid]);

  const isDisabled = useCallback((x, y) => getCell(x, y).isBlack, [getCell]);
  const getCellByCell = useCallback((cell) => {
    for (let y = 0, yLen = grid.length; y < yLen; y++) {
      const row = grid[y];
      for (let x = 0, xLen = row.length; x < xLen; x++) {
        const col = row[x];
        const { cells } = mode === 'across' ? col.across : col.down;
        if (cells && cells.includes(cell)) {
          return col;
        }
      }
    }
    return null;
  }, [grid, mode]);

  const getNextClue = useCallback((cell) => {
    const { clueIndex } = getCellByCell(cell);
    for (let y = 0, yLen = grid.length; y < yLen; y++) {
      const row = grid[y];
      for (let x = 0, xLen = row.length; x < xLen; x++) {
        const col = row[x];
        if (col.isStart && col.clueIndex > clueIndex) {
          if (mode === 'across' && col.across.clue) {
            return col;
          }
          if (mode === 'down' && col.down.clue) {
            return col;
          }
        }
      }
    }
    return getCellByClue(1);
  }, [getCellByCell, getCellByClue, grid, mode]);

  const getCoord = useCallback((cell) => (
    {
      x: cell % width,
      y: Math.floor(cell / width),
    }
  ), [width]);

  const move = useCallback((depth, originalCell) => {
    if (depth > width * height) {
      return { x: 0, y: 0 };
    }

    let cell = originalCell;
    if (mode === 'across') {
      cell = cell + 1;
    } else {
      cell = cell + width;
    }

    const { x, y } = getCoord(cell);

    if (x > width - 1 || y > height - 1 || isDisabled(x, y)) {
      return getCoord(getNextClue(originalCell).cell);
    }

    return { x, y };
  }, [getCoord, getNextClue, height, isDisabled, mode, width]);

  const onSelect = useCallback((x, y) => {
    if (!isDisabled(x, y)) {
      let newMode = mode;
      if (selected.x === x && selected.y === y) {
        newMode = mode === 'across' ? 'down' : 'across';
      }

      dispatch({
        data: {
          mode: newMode,
          selected: { x, y },
        },
        type: SET_SELECTED,
      });
    }
  }, [dispatch, isDisabled, mode, selected.x, selected.y]);

  const goToNext = useCallback((_x, _y) => {
    const { x, y } = move(0, grid[_y][_x].cell);
    onSelect(x, y);
  }, [grid, move, onSelect]);

  const onKeyDown = useCallback((e) => {
    const {
      altKey,
      ctrlKey,
      keyCode,
      metaKey,
    } = e;

    if (!grid || altKey || ctrlKey || metaKey) {
      return;
    }

    const { x, y } = selected;
    let prevent = true;
    if (keyCode > 64 && keyCode < 91) {
      dispatch({
        data: {
          value: String.fromCharCode(keyCode),
          x,
          y,
        },
        type: FILL,
      });
      goToNext(x, y);
    } else if (keyCode === Keys.BACKSPACE && !getCell(x, y).isBlack) {
      dispatch({
        data: {
          value: '',
          x,
          y,
        },
        type: FILL,
      });
    } else if (keyCode === Keys.ARROW_LEFT) {
      dispatch({
        data: {
          selected: {
            x: selected.x - 1 > 0 ? selected.x - 1 : 0,
            y,
          },
        },
        type: SET_SELECTED,
      });
    } else if (keyCode === Keys.ARROW_UP) {
      dispatch({
        data: {
          selected: {
            x,
            y: selected.y - 1 > 0 ? selected.y - 1 : 0,
          },
        },
        type: SET_SELECTED,
      });
    } else if (keyCode === Keys.ARROW_RIGHT) {
      dispatch({
        data: {
          selected: {
            x: selected.x + 1 < width ? selected.x + 1 : width - 1,
            y,
          },
        },
        type: SET_SELECTED,
      });
    } else if (keyCode === Keys.ARROW_DOWN) {
      dispatch({
        data: {
          selected: {
            x,
            y: selected.y + 1 < height ? selected.y + 1 : height - 1,
          },
        },
        type: SET_SELECTED,
      });
    } else {
      prevent = false;
    }

    if (prevent && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
  }, [getCell, goToNext, grid, height, selected, width]);

  const onKeyboardClick = useCallback((value) => {
    const keyCode = value === 'CLEAR' ? Keys.BACKSPACE : value.charCodeAt(0);
    onKeyDown({ keyCode });
  }, [onKeyDown]);

  const onClueClick = useCallback((clueIndex, newMode) => {
    dispatch({
      data: {
        mode: newMode,
        selected: getCoord(getCellByClue(clueIndex).cell),
      },
      type: SET_SELECTED,
    });
  }, [getCellByClue, getCoord]);

  const onDrop = useCallback((e) => {
    readPuz({ target: { files: e.dataTransfer.files } });
    e.preventDefault();
  }, []);

  const onDragEnter = useCallback((e) => {
    e.target.style.borderColor = colors.blue;
  }, []);

  const onDragLeave = useCallback((e) => {
    e.target.style.borderColor = colors.black;
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      const div = containerRef.current;
      div.style.height = `${window.innerHeight - div.getBoundingClientRect().top * 2}px`;
    }
  }, []);

  useEffect(() => {
    if (grid && selected.x === -1 && selected.y === -1) {
      dispatch({
        data: {
          selected: getCoord(getCellByClue(1).cell),
        },
        type: SET_SELECTED,
      });
    }
  }, [getCellByClue, getCoord, grid, selected.x, selected.y]);


  return (
    <Layout>
      <Container onKeyDown={onKeyDown} tabIndex={0} >
        <Header>
          <PuzzleTitle>{title} </PuzzleTitle> <PuzzleAuthor>{author}</PuzzleAuthor>
        </Header>
        {!grid && (
          <>
            <File onChange={readPuz} type="file" />
            <FileContainer
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              ref={containerRef}
            >
              Drag & Drop .puz File Here
            </FileContainer>
          </>
        )}
        {/* </> For Github syntax highlighting */}
        {grid && (
          <div className='container-fluid' ref={containerRef}>
            <div className='row'>
              <div className='col-12 col-lg-6 items-center'>
                <Puzzle
                  grid={grid}
                  height={height}
                  onSelect={onSelect}
                  width={width}
                />
              </div>
              <div className='col-12 col-lg-6'>
                <Clues
                  acrossClues={state.acrossClues}
                  clueIndex={state.clueIndex}
                  downClues={state.downClues}
                  height={height * CELL_SIZE}
                  mode={mode}
                  onClick={onClueClick}
                  width={width * CELL_SIZE}
                />
              </div>
            </div>
            <Keyboard onClick={onKeyboardClick} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Crossword;
