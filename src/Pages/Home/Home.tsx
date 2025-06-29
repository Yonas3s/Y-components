import './Home.css'
import Button from '../../Shared/Components/Button/Button'
import Header from '../../Shared/Sections/Header/Header'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home">
      <Header />
      <div className="home__container glass">
        <div className="glass__content">
          <h1>JUST Y</h1>
          <p>Say hello to your next-generation React components.</p>
          <Button onClick={() => navigate('/components')}>Get Started</Button>
        </div>
      </div>
    </div>
  )
}

export default Home 