import {DragDropContext, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

const Wrapper = styled.div`
  display:flex;
  max-width:680px;
  width: 100%;
  margin : 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3,1fr);

`;

function DateDetailPage() {
    const { date } = useParams<{ date: string }>();
  const [toDos, setToDos]  = useRecoilState(toDoState);
  const onDragEnd = (info : DropResult) =>{
    console.log(info);
    const {destination, draggableId, source} = info;
    if(!destination) return;
    if(destination?.droppableId === source.droppableId){
      // same board movement.
      setToDos((allBoards) =>{
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy,
        };
      });
    }
    if(destination.droppableId !== source.droppableId){
      // cross board movement.
      setToDos((allBoards) =>{
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        // 1) Delete item on source.index
        sourceBoard.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : destinationBoard,
        };
      });
    }
  };

  useEffect(()=>{
    window.localStorage.setItem(date + "",JSON.stringify(toDos));
    console.log('toDos',toDos);
    console.log('date',date);
  },[toDos]);


  return ( 
    <DragDropContext onDragEnd={onDragEnd}>
        <div>
      <h2>Date Detail Page</h2>
      <p>Selected date: {date}</p>
      {/* Add more details or components as needed */}
    </div>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => <Board boardId={boardId} key = {boardId} toDos = {toDos[boardId]} />)}
        </Boards>  
      </Wrapper>
    </DragDropContext>
  );
}

export default DateDetailPage;
