import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import { useState } from "react";
import Popup from "./Popup";
import { IoMdAdd } from "react-icons/io";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const BGAnimation = keyframes`
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
`;

const StyleContext = styled.div`
  background: linear-gradient(-45deg, #FFD600, #FF7A00, #FF0069, #D300C5, #7638FA);
  height: 100vh;
  display: flex;
  background-size: 600% 600%;
  animation: ${BGAnimation} 15s ease infinite;
`;

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

const PrevPageButton = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, white 1%, rgba(255, 255, 255, 0) 90%);
  border-radius: 50px;
  top: 5%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.2);
    background-color: #a9fff8;
  }
`;

function DateDetailPage() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;
    // console.log(info);
    if (info.type == "BOARD") {
      setToDos((oldToDos) => {
        const entries = Object.entries(oldToDos);
        [entries[source.index], entries[destination.index]] = [
          entries[destination.index],
          entries[source.index],
        ];
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

  const prevPage = () => {
    navigate(`/`);
  }


  return (
    
      <StyleContext>
        <Popup
          isOpen={isModalOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <PrevPageButton onClick={prevPage}>
            <GrLinkPrevious />

          </PrevPageButton>
          <CoponentAddButton onClick={handleOpen}>
            <IoMdAdd/>
          </CoponentAddButton>
          <Wrapper>
            <Droppable
              droppableId={`boards${Math.random().toString(36).substring(7)}`}
              type="BOARD"
              direction="horizontal"
            >
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
      </StyleContext>
    
  );
}

export default DateDetailPage;