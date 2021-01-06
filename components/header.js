import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">andmorefine</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/proverb">ことわざ一覧</Nav.Link>
          <Nav.Link href="/alphabetal">あいうえお一覧</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text><a href="/contact/new">お問い合わせ</a></Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  </>
)

export default Header
