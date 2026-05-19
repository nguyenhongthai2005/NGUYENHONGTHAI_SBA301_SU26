import Card from 'react-bootstrap/Card';

function Profile(props) {

  const { person } = props

  return (
    <Card>

      <Card.Img
        variant="top"
        src={person.avatar}
        style={{
          height: '300px',
          objectFit: 'cover'
        }}
      />

      <Card.Body>

        <h2>{person.name}</h2>

        <p>ID: {person.id}</p>

      </Card.Body>

    </Card>
  )
}

export default Profile
