// Write your code here
import './index.css'
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {lastDaysVaccine} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-heading">Vaccination Coverage</h1>
      <BarChart data={lastDaysVaccine} width={1000} height={300}>
        <XAxis
          dataKey="vaccineDate"
          tick={{stroke: '#6c757d', strokeWidth: 1}}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0,
          }}
        />
        <Legend wrapperStyle={{padding: 20}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" className="bar" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
