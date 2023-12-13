import { Draggable, Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { IoMdClose } from "react-icons/io";

const Wrapper = styled.div`
  width: 100%;
  min-width: 250px;
  padding-top: 10px;
  /* background-color: ${(props) => props.theme.boardColor}; */
  background-color: rgba(190, 190, 190, 0.5);
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  width: 90%;
  border-radius: 5px;
  border: 1px solid white;
  height: 30px;
  display: flex;
  margin: 0 auto;
  padding: 5px;
  background: transparent;
  color: white;
`;

const Area = styled.div<IAreaProps>`
  background: ${(props) =>
    props.$isDraggingOver
      ? "linear-gradient(rgba(255, 184, 184, 0), rgba(43, 255, 50, 0.3))"
      : props.$draggingFromThis
      ? "linear-gradient(rgba(255, 184, 184, 0), rgba(255, 52, 52, 0.3))"
      : "transparent"};
  flex-grow: 1;
  transition: all 0.3s ease;
  padding: 20px;
`;

const DelBtn = styled.button<{ boardId: string }>`
  background-color: transparent;
  border: 0;
  position: absolute;
  cursor: pointer;
  z-index:1;
`;

const Form = styled.form``;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThis: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setTodos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo],
      };
    });
    setValue("toDo", "");
  };

  const onSubmit = (del_id: number) => {
    // console.log(+boardId - 1 + "", del_id);
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: allBoards[boardId].filter((_, idx) => idx !== del_id),
      };
    });
  };

  const closeBtn = () => {
    setTodos((allBoards) => {
      const updatedBoards = { ...allBoards };
      delete updatedBoards[boardId];
      return updatedBoards;
    });
  };

  return (
    <>
      <Draggable draggableId={boardId} index={index}>
        {(provided) => (
          <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
            <Title {...provided.dragHandleProps}>{boardId}</Title>
            <DelBtn boardId={boardId} onClick={closeBtn}>
              <IoMdClose />
            </DelBtn>

            <Form onSubmit={handleSubmit(onValid)}>
              <Input {...register("toDo", { required: true })} type="text" />
            </Form>
            <Droppable droppableId={boardId}>
              {(magic, info) => (
                <Area
                  $isDraggingOver={info.isDraggingOver}
                  $draggingFromThis={Boolean(info.draggingFromThisWith)}
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                >
                  {toDos.map((toDo, index) => (
                    <DragabbleCard
                      key={toDo.id}
                      index={index}
                      toDoId={toDo.id}
                      toDoText={toDo.text}
                      onSubmit={onSubmit}
                    />
                  ))}
                  {magic.placeholder}
                </Area>
              )}
            </Droppable>
          </Wrapper>
        )}
      </Draggable>
    </>
  );
}

export default Board;
