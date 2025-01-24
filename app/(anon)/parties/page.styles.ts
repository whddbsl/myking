import styled from "styled-components";

export const PartyComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .menu-item {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;

    h2 {
      margin: 0;
      font-size: 18px;
    }

    p {
      color: #555;
    }

    button {
      margin-top: 8px;
      padding: 8px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;
