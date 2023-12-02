import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import { useState } from "react";
import Popup from "./Popup";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
  margin-top: 100px;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const CoponentAddButton = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, white 1%, rgba(255, 255, 255, 0) 90%);
  border-radius: 50px;
  top: 5%;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: rotate(0.5turn);
    background-color: #a9fff8;
  }
`;

const Icon = styled.img`
  src: ${(p) => p.src};
  width: ${(p) => p.width};
`;

function DateDetailPage() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;
    // console.log(info);
    if (info.type == "BOARD") {
      setToDos((oldToDos) => {
        const entries = Object.entries(oldToDos);
        [entries[source.index], entries[destination.index]] = [entries[destination.index], entries[source.index]];
        const newObj = Object.fromEntries(entries);
        return newObj;
      });
    } else {
      if (destination?.droppableId === source.droppableId) {
        setToDos((oldToDos) => {
          const boardCopy = [...oldToDos[source.droppableId]];
          const taskObj = boardCopy[source.index];

          boardCopy.splice(source?.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...oldToDos,
            [source.droppableId]: boardCopy,
          };
        });
      } else {
        setToDos((allBoard) => {
          const sourceBoard = [...allBoard[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const targetBoard = [...allBoard[destination.droppableId]];

          sourceBoard.splice(source.index, 1);
          targetBoard.splice(destination.index, 0, taskObj);

          return {
            ...allBoard,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: targetBoard,
          };
        });
      }
    }
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = (inputValue: any) => {
    if (inputValue == "") return window.alert("빈 값으로 추가할 수 없습니다.");
    setToDos((p) => {
      return {
        ...p,
        [inputValue]: [],
      };
    });
    handleClose();
  };

  return (
    <>
      <Popup isOpen={isModalOpen} onClose={handleClose} onSubmit={handleSubmit} />

      <DragDropContext onDragEnd={onDragEnd}>
        <CoponentAddButton onClick={handleOpen}>
          <Icon src="./icons/add.png" width="20px" />
        </CoponentAddButton>
        <Wrapper>
          <Droppable droppableId={`boards${Math.random().toString(36).substring(7)}`} type="BOARD" direction="horizontal">
            {(provided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(toDos).map((k, i) => (
                  <div>
                    <Board key={k} boardId={k} toDos={toDos[k]} index={i} />
                  </div>
                ))}
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default DateDetailPage;