import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MenuButton = styled.button`
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
  color: white;

  &:hover {
    background: #1e293b;
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.6);
  padding: 8px 12px;
  border-radius: 10px;
  width: 280px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #d1d5db;
  font-size: 14px;
  margin-left: 8px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconButton = styled.button`
  position: relative;
  padding: 8px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  color: white;

  &:hover {
    background: #1e293b;
  }
`;

export const NotificationDot = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #1e293b;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  color: white;
  font-size: 14px;

  &:hover {
    background: #263143;
  }
`;
