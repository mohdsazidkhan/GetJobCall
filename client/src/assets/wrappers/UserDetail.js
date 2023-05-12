import styled from 'styled-components'

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadowcard);
  
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  header.headerTop{
    position: sticky;
    top: 64px;
    background: #fff;
    border: 1px solid var(--grey-100);
  }
  header.bottom {
    border-top: 1px solid var(--grey-100);
  }
  .main-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      color: var(--primary-500);
      letter-spacing: var(--letterSpacing);
    }
  }
  header.bottom {
    .info {
      p {
        color: var(--grey-400);
      }
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--blue-dark);
    background: var(--blue-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
  @media (max-width:768px){
    header.headerTop {
      padding: .75rem;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
    }
    .main-icon {
      width: 36px;
      height: 36px;
      font-size: 1rem;
      margin-right: 0.75rem;
    }
    .companyDetail span{
      display:none;
    }
    .content , .postedBy header.bottom, .postedBy h4{
      padding: 1rem;
    }
    .content-center {
      grid-template-columns: auto auto;
      row-gap: 0rem;
    }
    .jobDescription p span,
    .jobDescription ul li{
      font-size: 17px;
      letter-spacing: .5px;
    }
  } 
  @media (min-width:769px) and (max-width:991px){
    header.headerTop {
      padding: .75rem;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
    }
    .main-icon {
      width: 36px;
      height: 36px;
      font-size: 1rem;
      margin-right: 0.75rem;
    }
    .companyDetail span{
      display:none;
    }
    .content , .postedBy header.bottom, .postedBy h4{
      padding: 1rem;
    }
    .content-center {
      grid-template-columns: auto auto;
      row-gap: 0rem;
    }
    .jobDescription p span,
    .jobDescription ul li{
      font-size: 17px;
      letter-spacing: .5px;
    }
  } 
`

export default Wrapper
