// Write your code here
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}
class CowinDashboard extends Component {
  state = {
    lastDaysVaccine: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getCovidList()
  }

  getCovidList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updateLastDaysVaccine = data.last_7_days_vaccination.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))
      const updatedVaccineByAge = data.vaccination_by_age
      const updatedVaccineByGender = data.vaccination_by_gender
      this.setState({
        lastDaysVaccine: updateLastDaysVaccine,
        vaccinationByAge: updatedVaccineByAge,
        vaccinationByGender: updatedVaccineByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {lastDaysVaccine, vaccinationByAge, vaccinationByGender} = this.state
    return (
      <>
        <VaccinationCoverage lastDaysVaccine={lastDaysVaccine} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => {
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="fail-msg">Something went wrong</h1>
      </div>
    )
  }
  renderLoader = () => {
    return (
      <div data-testid="loader" className="loader-container">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoader()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-img"
          />
          <h1 className="logo-heading">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {this.renderAll()}
      </div>
    )
  }
}

export default CowinDashboard
