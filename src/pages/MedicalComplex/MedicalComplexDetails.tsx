import { Button, Center, Flex, ScrollArea, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InfoSide from "../../Components/CompanyDetails/InfoSide";
import { BrainCog, Mail, MapPin, PhoneCall } from "lucide-react";
import CardsInfo from "../../Components/CompanyDetails/CardsInfo";
import ListComponent from "../../Components/CompanyDetails/ListComponent";
import GridList from "../../Components/CompanyDetails/GridList";
import { BiClinic } from "react-icons/bi";
import useMedicalComplexDetails from "../../hooks/medicalcomplex/useMedicalComplexDetails";
import { useParams } from "react-router";
import ContactInfo from "../../types/common/ContactInfo";
import { useTranslation } from "react-i18next";
import useDeleteById from "../../hooks/delete/useDeleteById";
import WorkingSchedule from "../../Components/UserDetails/WorkingSchedule";
import PercentageTable from "../../Components/DoctorsDetails/PercentageTable";

const MedicalComplexDetails = () => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery("(min-width: 577px) and (max-width: 992px)");
  const isComputer = useMediaQuery("(min-width: 993px)");
  const { id } = useParams();
  const deleteMedcalComplex = useDeleteById({
    endpoint: "cliniccollections",
    mutationKey: "delete-cliniccollection",
    navigationUrl: "/medicalComplexes",
  });
  const { data, isFetched } = useMedicalComplexDetails(id!);

  // if (!isFetched || !data)
  //   return (
  //     <Center>
  //       <Text>{t("noMedicalDetailsFound")}</Text>
  //     </Center>
  //   );

  if(!isFetched){
    return <Center>
      {/* <Text>{t("noMedicalDetailsFound")}</Text> */}
    </Center>
  }

  if (!data)
  return (
    <Center>
      <Text>{t("noMedicalDetailsFound")}</Text>
    </Center>
  );

  console.log("working hours" + data.workingDays);

  const titles = [
    t("establishmentYear"),
    t("vision"),
    t("goals"),
    t("overview"),
  ];
  const values = [
    data.createdAt.slice(0, 10),
    data.vision,
    data.details,
    data.overview,
  ];
  const icons = data.contactInfos.map((item: ContactInfo) => {
    if (item.type === "email") {
      return {
        icon: <Mail size={24} />,
        href: `mailto:${item.value}`,
      };
    } else if (item.type === "phone") {
      return {
        icon: <PhoneCall size={24} />,
        href: `tel:${item.value}`,
      };
    } else {
      return {
        icon: <MapPin size={24} />,
        href: `https://www.google.com/maps?q=${encodeURIComponent(item.value)}`,
      };
    }
  });
  const handleDeleteEvent = () => {
    deleteMedcalComplex.mutate(id!);
  };
  const thHoliday = ["name", "date", "reason"];
  return (
    <ScrollArea h="100vh">
      <Flex direction={isComputer ? "row" : "column"}>
        <Flex w={isComputer ? "23%" : "100%"}>
          <InfoSide
            url={""}
            name={data.name}
            contactInfoIcons={icons}
            iconsMaxWidth=""
            values={values}
            titles={titles}
            titlesWidth="90"
            hasSocialMedia={true}
            socialMediaIcons={icons}
            hasActivation={true}
            isActive={data.isActive}
          />
        </Flex>
        <Flex w={isComputer ? "73%" : "100%"} direction="column">
          <Flex w="100%">
            <CardsInfo
              titles={[
                t("clinicsNumber"),
                t("patientsNumber"),
                t("doctorsNumber"),
              ]}
              values={[
                data.clinicsCount.toString(),
                data.patientsCount.toString(),
                data.doctorsCount.toString(),
              ]}
            />
          </Flex>
          <Flex w="100%" direction={isComputer ? "row" : "column"}>
            <Flex w={isComputer ? "66%" : "100%"} direction="column">
              <Flex w="100%">
                <Flex w="49%">
                  <ListComponent
                    icon={<BiClinic size={16} />}
                    listItems={data.assignedDepartments.map(
                      (item) => item.name
                    )}
                    title={t("departments")}
                  />
                </Flex>
                <Flex w="49%">
                  <ListComponent
                    icon={<BiClinic size={16} />}
                    listItems={data.assignedClinics.map((item) => item.name)}
                    title={t("clinics")}
                  />
                </Flex>
              </Flex>
              <Flex w={isComputer ? "66%" : "90%"}>
                <ListComponent
                  icon={<BrainCog size={16} />}
                  listItems={data.specializations.map((item) => item.name)}
                  title={t("specialties")}
                />
              </Flex>
            </Flex>
            <Flex
              w={isComputer ? "33%" : "100%"}
              direction={isTablet ? "row" : "column"}
            >
              <GridList
                girdItems={data.assignedDoctors.map((item) => item.name)}
                title={t("doctors")}
              />
              <GridList
                girdItems={data.assignedStaff.map((item) => item.name)}
                title={t("staff")}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%">
        <WorkingSchedule workingHours={data.workingDays} />
        <Flex w="50%">
          <PercentageTable
            mah="250px"
            buttonValue=""
            visibleButton={false}
            tableTitle={t("holidays")}
            th={thHoliday}
            tb={data.holidays}
          />
        </Flex>
      </Flex>
      <Button
        variant="filled"
        color="red"
        radius="xl"
        mb="110px"
        onClick={handleDeleteEvent}
      >
        Delete
      </Button>
    </ScrollArea>
  );
};

export default MedicalComplexDetails;
