import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0 5rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 94%;
    }
  }
  @media (max-width:768px){
    .dashboard-page {
      width: 96vw;
      padding: 0.5rem 0 5rem 0;
    }
  }
`
export default Wrapper
