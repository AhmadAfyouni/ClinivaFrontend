import { Grid, ScrollArea } from '@mantine/core'
import PatientInfoCard from '../../Components/Details/PatientInfoCard'
import InsuranceCard from '../../Components/Details/InsuranceCard'
import MedicalInfo from '../../Components/Details/MedicalInfo'
import ContactPersonInfo from '../../Components/Details/ContactPersonInfo'
import HealthReportList from '../../Components/Details/HealthReportList'
import AllergyMedicationCard from '../../Components/Details/AllergyMedicationCard '

export const PatientDetails = () => {
  return (
    <ScrollArea h='100vh'>
        <Grid columns={8}>
            <Grid.Col span={2}>
                <InsuranceCard/>    
                <PatientInfoCard/>
            </Grid.Col>
            <Grid.Col span={4}>
                <MedicalInfo/> 
                <AllergyMedicationCard/>
                <Grid columns={2}>
                <Grid.Col span={1}>
                        <ContactPersonInfo/>
                </Grid.Col>
                <Grid.Col span={1}>
                        <HealthReportList/>
                </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>

    </ScrollArea>
)
}
