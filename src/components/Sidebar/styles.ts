import styled from "styled-components";

interface ItemProps {
  active?: boolean;
}

const Container = styled.div`
  height: 100%;
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  background: transparent;
  color: var(--text-secondary);
  float: left;

  h1 {
    color: var(--white);
    padding: 3em;
    font-size: 1.2em;
    font-weight: normal;
  }
`;

const Item = styled.div<ItemProps>`
  position: relative;
  padding: 1em 3em;
  color: ${(props) =>
    props.active ? "var(--white)" : "var(--text-secondary)"};
  cursor: pointer;

  &:hover {
    color: var(--white);
  }

  &::before {
    content: "";
    display: ${(props) => (props.active ? "block" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(79, 204, 177, 0.1);
    border-left: 0.25em solid var(--green-400);
  }
`;

export { Container, Item };
