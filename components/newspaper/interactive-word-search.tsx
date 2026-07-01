"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RotateCcw, Search, X } from "lucide-react";

type Cell = {
  row: number;
  col: number;
};

type Props = {
  instruction: string;
  words: readonly string[];
  grid: readonly (readonly string[])[];
};

const keyOf = (cell: Cell) => `${cell.row}-${cell.col}`;
const sameCell = (a: Cell, b: Cell) => a.row === b.row && a.col === b.col;
const normalize = (value: string) => value.replace(/[^a-z]/gi, "").toUpperCase();

function getPath(start: Cell, end: Cell) {
  const rowDelta = end.row - start.row;
  const colDelta = end.col - start.col;
  const rowDistance = Math.abs(rowDelta);
  const colDistance = Math.abs(colDelta);

  if (
    start.row !== end.row &&
    start.col !== end.col &&
    rowDistance !== colDistance
  ) {
    return [];
  }

  const rowStep = Math.sign(rowDelta);
  const colStep = Math.sign(colDelta);
  const length = Math.max(rowDistance, colDistance) + 1;

  return Array.from({ length }, (_, index) => ({
    row: start.row + rowStep * index,
    col: start.col + colStep * index,
  }));
}

export function InteractiveWordSearch({ instruction, words, grid }: Props) {
  const [tapStart, setTapStart] = useState<Cell | null>(null);
  const [dragStart, setDragStart] = useState<Cell | null>(null);
  const [dragEnd, setDragEnd] = useState<Cell | null>(null);
  const [foundWords, setFoundWords] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [foundCells, setFoundCells] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [status, setStatus] = useState(
    "Tap the first and last letters of each word.",
  );
  const [showSolvedModal, setShowSolvedModal] = useState(false);

  const modalOverlayRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<Cell | null>(null);
  const didDragRef = useRef(false);
  const ignoreNextClickRef = useRef(false);

  const normalizedWords = useMemo(
    () => new Map(words.map((word) => [normalize(word), word])),
    [words],
  );

  const activePath = useMemo(() => {
    if (dragStart && dragEnd) {
      const path = getPath(dragStart, dragEnd);
      return path.length > 0 ? path : [dragStart];
    }

    return tapStart ? [tapStart] : [];
  }, [dragEnd, dragStart, tapStart]);

  const activeCells = useMemo(
    () => new Set(activePath.map((cell) => keyOf(cell))),
    [activePath],
  );

  const commitSelection = (start: Cell, end: Cell) => {
    const path = getPath(start, end);

    if (path.length === 0) {
      setStatus("Words run straight across, down, or diagonal.");
      setTapStart(start);
      return;
    }

    if (path.length < 2) {
      setStatus("Choose the other end of the word.");
      return;
    }

    const letters = path.map((cell) => grid[cell.row][cell.col]).join("");
    const reversedLetters = letters.split("").reverse().join("");
    const forwardMatch = normalizedWords.get(normalize(letters));
    const reverseMatch = normalizedWords.get(normalize(reversedLetters));
    const match = forwardMatch ?? reverseMatch;

    setTapStart(null);

    if (!match) {
      setStatus("No match there. Try another headline.");
      return;
    }

    const normalizedMatch = normalize(match);
    const nextFoundCount = foundWords.has(normalizedMatch)
      ? foundWords.size
      : foundWords.size + 1;

    setFoundWords((previous) => {
      const next = new Set(previous);
      next.add(normalizedMatch);
      return next;
    });
    setFoundCells((previous) => {
      const next = new Set(previous);
      path.forEach((cell) => next.add(keyOf(cell)));
      return next;
    });
    setStatus(
      nextFoundCount === words.length
        ? "Front-page scoop: every word has been found."
        : `${match} found. ${words.length - nextFoundCount} to go.`,
    );

    if (nextFoundCount === words.length) {
      setShowSolvedModal(true);
    }
  };

  useEffect(() => {
    if (!showSolvedModal) return;
    const previousOverflow = document.body.style.overflow;
    const updateVisibleViewport = () => {
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop ?? 0;
      const height = viewport?.height ?? window.innerHeight;

      modalOverlayRef.current?.style.setProperty("--puzzle-vv-top", `${top}px`);
      modalOverlayRef.current?.style.setProperty("--puzzle-vv-height", `${height}px`);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSolvedModal(false);
    };
    document.body.style.overflow = "hidden";
    updateVisibleViewport();
    window.visualViewport?.addEventListener("resize", updateVisibleViewport);
    window.visualViewport?.addEventListener("scroll", updateVisibleViewport);
    window.addEventListener("resize", updateVisibleViewport);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", updateVisibleViewport);
      window.visualViewport?.removeEventListener("resize", updateVisibleViewport);
      window.visualViewport?.removeEventListener("scroll", updateVisibleViewport);
      document.body.style.overflow = previousOverflow;
    };
  }, [showSolvedModal]);

  const handleTap = (cell: Cell) => {
    if (!tapStart) {
      setTapStart(cell);
      setStatus("Now tap the final letter of that word.");
      return;
    }

    if (sameCell(tapStart, cell)) {
      setTapStart(null);
      setStatus("Selection cleared. Pick a word to find.");
      return;
    }

    commitSelection(tapStart, cell);
  };

  const reset = () => {
    setTapStart(null);
    setDragStart(null);
    setDragEnd(null);
    dragStartRef.current = null;
    didDragRef.current = false;
    setFoundWords(new Set());
    setFoundCells(new Set());
    setStatus("Tap the first and last letters of each word.");
  };

  const solvedModal = showSolvedModal && typeof document !== "undefined"
    ? createPortal(
        <div
          ref={modalOverlayRef}
          className="clone-puzzle-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clone-puzzle-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowSolvedModal(false);
          }}
        >
          <div className="clone-puzzle-modal">
            <button
              type="button"
              className="clone-puzzle-modal-close"
              aria-label="Close"
              onClick={() => setShowSolvedModal(false)}
            >
              <X size={18} />
            </button>
            <p className="clone-puzzle-modal-title" id="clone-puzzle-modal-title">
              🎉 PUZZLE SOLVED! 🎉
            </p>
            <p className="clone-puzzle-modal-lead">
              Well, well, well… look who&apos;s smarter than the average wedding guest! 🧩😏
            </p>
            <p className="clone-puzzle-modal-body">
              You&apos;ve officially cracked the code and earned VIP bragging rights.
            </p>
            <button
              type="button"
              className="clone-puzzle-modal-button"
              onClick={() => setShowSolvedModal(false)}
            >
              Close
            </button>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <h2>{instruction}</h2>
      <p className="clone-word-list" aria-label="Words to find">
        {words.map((word, index) => {
          const found = foundWords.has(normalize(word));

          return (
            <Fragment key={word}>
              {index > 0 && <span className="clone-word-separator">♥</span>}
              <span data-found={found}>{word}</span>
            </Fragment>
          );
        })}
      </p>
      <div
        className="clone-word-grid"
        style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}
      >
        {grid.flatMap((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const cell = { row: rowIndex, col: colIndex };
            const cellKey = keyOf(cell);
            const isFound = foundCells.has(cellKey);
            const isSelected = activeCells.has(cellKey);

            return (
              <button
                aria-label={`Letter ${letter}, row ${rowIndex + 1}, column ${colIndex + 1}`}
                aria-pressed={isSelected || isFound}
                className="clone-word-cell"
                data-found={isFound}
                data-selected={isSelected}
                key={cellKey}
                type="button"
                onClick={() => {
                  if (ignoreNextClickRef.current) {
                    ignoreNextClickRef.current = false;
                    return;
                  }

                  handleTap(cell);
                }}
                onPointerDown={() => {
                  dragStartRef.current = cell;
                  didDragRef.current = false;
                  setDragStart(cell);
                  setDragEnd(cell);
                }}
                onPointerEnter={() => {
                  if (!dragStartRef.current) return;
                  didDragRef.current = true;
                  setDragEnd(cell);
                }}
                onPointerUp={() => {
                  const start = dragStartRef.current;
                  ignoreNextClickRef.current = true;
                  dragStartRef.current = null;
                  setDragStart(null);
                  setDragEnd(null);

                  if (!start) return;

                  if (didDragRef.current && !sameCell(start, cell)) {
                    commitSelection(start, cell);
                  } else {
                    handleTap(cell);
                  }

                  didDragRef.current = false;
                }}
                onPointerCancel={() => {
                  dragStartRef.current = null;
                  didDragRef.current = false;
                  setDragStart(null);
                  setDragEnd(null);
                }}
              >
                {letter}
              </button>
            );
          }),
        )}
      </div>
      <div className="clone-word-actions">
        <p className="clone-pencil">
          <span>⌕ Circle each word as you find it</span>
          <Search size={20} />
        </p>
        <p className="clone-word-status" aria-live="polite">
          {status}
        </p>
        <button className="clone-reset-button" type="button" onClick={reset}>
          <RotateCcw size={13} />
          Reset puzzle
        </button>
      </div>

      {solvedModal}
    </>
  );
}
