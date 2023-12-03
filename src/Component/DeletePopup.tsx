import React, { useState } from "react";
import { styled } from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  /* background-color: ${(props) => props.theme.boardColor}; */
  background-color: rgba(190, 190, 190, 0.5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;


const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex:1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  paddingTop: "20px",
  borderRadius: "8px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
`;

const Button = styled.button<{ btn_type: string }>`
  width: 50%;
  height: 40px;
  border: 1px solid #dedede;
  background-color: white;
  font-family: 'insungitCutelivelyjisu', sans-serif;
  cursor: pointer;
`;

const DeletePopup: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm();
  };

  return (
    <div style={overlayStyle}>
      <Wrapper style={modalStyle}>
        <Title>해당 날짜의 모든 보드를<br/> 삭제하시겠습니까?</Title>
        <Buttons>
          <Button onClick={handleSubmit} btn_type="ok">
            삭제
          </Button>
          <Button onClick={onClose} btn_type="no" style={{ borderLeft: "0" }}>
            취소
          </Button>
        </Buttons>
      </Wrapper>
    </div>
  );
};

export default DeletePopup;