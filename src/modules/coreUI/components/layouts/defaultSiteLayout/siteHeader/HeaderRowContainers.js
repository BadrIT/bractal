import styled from '@emotion/styled';

export const DefaultHeaderBottomRowContainer = styled.div`
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    border: solid;
    border-color: rgba(40,40,40,0.1);
    border-width: 1px;
    background-color: white;
  }
`;

export const DefaultHeaderTopRowContainer = styled.div`  
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    border: none;
    box-shadow: none;
    background-color: transparent;
    border-radius: 8px;
  }
`;
