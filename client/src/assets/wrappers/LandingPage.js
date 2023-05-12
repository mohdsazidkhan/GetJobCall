import styled from 'styled-components'

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .page {
    height: calc(100vh - var(--nav-height));
    display: grid;
  }
  .info{
    margin-top: 10vh;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
  @media (max-width: 767px){
    .info {
      margin-top: 0;
      padding-bottom: 5vh;
    }
  }
`
export default Wrapper
