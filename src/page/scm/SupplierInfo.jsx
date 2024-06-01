import React, { useEffect, useState } from "react";
import CustomStepper from "../../components/common/Stepper";
import StepOne from "../../components/scm/supplierInfo/StepOne";
import StepTwo from "../../components/scm/supplierInfo/StepTwo";
import StepThree from "../../components/scm/supplierInfo/StepThree";
import StepFour from "../../components/scm/supplierInfo/StepFour";
import StepFive from "../../components/scm/supplierInfo/StepFive";
import StepSix from "../../components/scm/supplierInfo/StepSix";
import { useForm } from "react-hook-form";
import {
  useSaveSupplierMutation,
  useUpdateSupplierMutation,
  useUpdateSupplierStep2Mutation,
  useUpdateSupplierStep3Mutation,
  useUpdateSupplierStep4Mutation,
  useUpdateSupplierStep5Mutation,
  useUpdateSupplierStep6Mutation,
} from "../../redux/features/scm/supplierInfo/mutationSupplierInfo";
import { useSelector } from "react-redux";
import { useGetSupplierInfoBySupQuery } from "../../redux/features/scm/supplierInfo/querySupplierInfo";
import { successToast, warningToast } from "../../common/toaster/toaster";

const SupplierInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [supplier, setSupplier] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const {
    data: prevData,
    isLoading: isPrevLoading,
    refetch: prevDataRefetch,
  } = useGetSupplierInfoBySupQuery(supplier && supplier.nUserID, {
    refetchOnMountOrArgChange: true,
  });

  const [
    saveSupplier,
    { data: saveSupplierData, isSuccess: isSupplierSuccess },
  ] = useSaveSupplierMutation();
  const [
    updateSupplier,
    { data: updateSupplierData, isSuccess: isUpdateSupplierSuccess },
  ] = useUpdateSupplierMutation();
  const [
    updateSupplierStep2,
    { data: updateSupplierStep2Data, isSuccess: isUpdateSupplierStep2Success },
  ] = useUpdateSupplierStep2Mutation();
  const [
    updateSupplierStep3,
    { data: updateSupplierStep3Data, isSuccess: isUpdateSupplierStep3Success },
  ] = useUpdateSupplierStep3Mutation();
  const [
    updateSupplierStep4,
    { data: updateSupplierStep4Data, isSuccess: isUpdateSupplierStep4Success },
  ] = useUpdateSupplierStep4Mutation();
  const [
    updateSupplierStep5,
    { data: updateSupplierStep5Data, isSuccess: isUpdateSupplierStep5Success },
  ] = useUpdateSupplierStep5Mutation();
  const [
    updateSupplierStep6,
    { data: updateSupplierStep6Data, isSuccess: isUpdateSupplierStep6Success },
  ] = useUpdateSupplierStep6Mutation();

  useEffect(() => {
    if (isUpdateSupplierSuccess) {
      successToast(updateSupplierData?.message);
    }
  }, [isUpdateSupplierSuccess]);
  useEffect(() => {
    if (isSupplierSuccess) {
      successToast(saveSupplierData?.message);
      prevDataRefetch();
    }
  }, [isSupplierSuccess]);
  useEffect(() => {
    if (isUpdateSupplierStep2Success) {
      successToast(updateSupplierStep2Data?.message);
      prevDataRefetch();
    }
  }, [isUpdateSupplierStep2Success]);

  useEffect(() => {
    if (isUpdateSupplierStep3Success) {
      successToast(updateSupplierStep3Data?.message);
      prevDataRefetch();
    }
  }, [isUpdateSupplierStep3Success]);

  useEffect(() => {
    if (isUpdateSupplierStep4Success) {
      successToast(updateSupplierStep4Data?.message);
      prevDataRefetch();
    }
  }, [isUpdateSupplierStep4Success]);
  useEffect(() => {
    if (isUpdateSupplierStep5Success) {
      successToast(updateSupplierStep5Data?.message);
      prevDataRefetch();
    }
  }, [isUpdateSupplierStep5Success]);
  useEffect(() => {
    if (isUpdateSupplierStep6Success) {
      successToast(updateSupplierStep6Data?.message);
      prevDataRefetch();
    }
  }, [isUpdateSupplierStep6Success]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nUserID: null,
      sic_id: null,
      sn_id: null,
      sbt_id: null,
      cor_id: null,
    },
  });

  const steps = [
    {
      title: "one",
      element: (
        <StepOne
          setValue={setValue}
          watch={watch}
          supplier={supplier}
          setSupplier={setSupplier}
          register={register}
          errors={errors}
          prevData={prevData}
        />
      ),
    },
    {
      title: "two",
      element: (
        <StepTwo
          setValue={setValue}
          watch={watch}
          register={register}
          errors={errors}
          prevData={prevData}
        />
      ),
    },
    {
      title: "three",
      element: (
        <StepThree
          setValue={setValue}
          watch={watch}
          register={register}
          errors={errors}
          prevData={prevData}
        />
      ),
    },
    {
      title: "four",
      element: (
        <StepFour
          setValue={setValue}
          watch={watch}
          register={register}
          errors={errors}
          prevData={prevData}
        />
      ),
    },
    {
      title: "five",
      element: (
        <StepFive
          setValue={setValue}
          watch={watch}
          register={register}
          errors={errors}
          prevData={prevData}
        />
      ),
    },
    {
      title: "six",
      element: (
        <StepSix
          setValue={setValue}
          watch={watch}
          register={register}
          errors={errors}
          prevData={prevData}
        />
      ),
    },
  ];

  const handleNext = (data) => {
    if (prevData[0]?.si_created_com) {
      return warningToast(
        "You Have Already Completed, Cannot Update or Create!"
      );
    }

    const stepOnePayload = {
      supname: supplier?.cUserFullname,
      category: data?.sic_id,
      suptype: data?.sn_id,
      businesstype: data?.sbt_id,
      country: data?.cor_id,
      factorynameenglish: data?.factoryNameEnglish,
      factoryaddress: data?.factoryAddressEnglish,
      factoryownername: data?.factoryOwnerName,
      factoryownerdesignation: data?.factoryOwnerDesignation,
      factoryownersim: data?.factoryOwnerPhone,
      factoryowneremail: data?.factoryOwnerEmail,
      markatingname: data?.responsiblePersonName,
      mardesignation: data?.responsiblePersonDesignation,
      marsim: data?.responsiblePersonPhone,
      maremail: data?.responsiblePersonEmail,
      hrname: data?.hrName,
      hrdesignation: data?.hrDesignation,
      hrsim: data?.hrPhone,
      hremail: data?.hrEmail,
      createdby: user?.userName,
    };
    if (activeStep === 0) {
      if (prevData?.length > 0) {
        const { supname, createdby, ...stepOneUpdatePayload } = stepOnePayload;
        (stepOneUpdatePayload.supId = prevData[0]?.si_id),
          updateSupplier(stepOneUpdatePayload);
      } else if (prevData?.length === 0 || prevData === undefined) {
        saveSupplier(stepOnePayload);
      }
    }
    if (activeStep === 1) {
      const stepTwoPayload = {
        supId: prevData[0]?.si_id,
        customar1: data?.customerName1,
        customar2: data?.customerName2,
        customar3: data?.customerName3,
        businesspersentage1: parseFloat(data?.business1),
        businesspersentage2: parseFloat(data?.business2),
        businesspersentage3: parseFloat(data?.business3),
        annualbusinessqty: parseFloat(data?.businessVolume),
        annualbusinessvalue: data?.businessTurnover,
        totalworkar: parseInt(data?.Workers),
        bsci_YN: data?.yn_id,
        bscibidid: data?.DBID,
        bsciauditdt: data?.BSCIAuditDate,
        bsciauditfirm: data?.AuditConductedFirm,
        bsciauditrate: data?.bci_ar_id,
        bsciauditexpairedate: data?.BSCIAuditExpDate,
      };

      updateSupplierStep2(stepTwoPayload);
    }
    if (activeStep === 2) {
      const stepThreePayload = {
        supId: prevData[0]?.si_id,
        sedexYN: data?.haveSEDEX,
        sedexauditdate: data?.SEDEXAuditDate,
        sedexauditfirm: data?.SEDEXAuditFirm,
        wrapYN: data?.haveWrap,
        wrapauditdate: data?.WRAPAuditDate,
        wrapauditrate: data?.rar_id,
        wrapauditfirm: data?.WRAPAuditFirm,
        wrapauditexpairedate: data?.WRAPCertificateExpDate,
        higgorg: data?.haveHIGG,
        higgID: data?.HIGGFacilityID,
        higgsascore: data?.HIGGFEMSelfAssessment,
        higgfvscore: data?.HIGGFEMVerified,
        higgfsasscore: data?.HIGGFSLMSelfAssessment,
        higgfsvscore: data?.FEMSelfAssessment,
        okteXyN: data?.haveOEKOTex,
        okotex: data?.OEKOTEXCertificateExpDate,
      };
      updateSupplierStep3(stepThreePayload);
    }
    if (activeStep === 3) {
      const stepFourPayload = {
        supId: prevData[0]?.si_id,
        isoYN: data?.haveISO1400,
        isoExpireDate: data?.ISO14001,
        ocs: data?.OCS ? "OCS" : null,
        rcs: data?.RCS ? "RCS" : null,
        grs: data?.GRS ? "GRS" : null,
        gots: data?.GOTS ? "GOTS" : null,
        rds: data?.RDS ? "RDS" : null,
        rws: data?.RWS ? "RWS" : null,
        ccs: data?.CCS ? "CCS" : null,
        others: data?.Other ? "Other" : null,
        etp: data?.factoryHaveETP,
        emsname: data?.emsName,
        emsdesignation: data?.emsDesignation,
        emssim: data?.emsPhone,
        emsemail: data?.emsEmail,
        etpiso4500YN: data?.haveISO4500,
        etpiso4500_exp_date: data?.ISO4500,
        etpiso9001YN: data?.haveISO9001,
        etpiso9001_exp_date: data?.ISO9001,
      };
      updateSupplierStep4(stepFourPayload);
    }
    if (activeStep === 4) {
      const stepFivePayload = {
        supId: prevData[0]?.si_id,
        scsYN: data?.HaveSCS,
        scsauditexpdate: data?.HaveSCSExpDate,
        scanYN: data?.HaveScan,
        scanauditexdate: data?.HaveScanExpDate,
        localOffYN: data?.HaveAgency,
        lname: data?.agencyName,
        ldesignation: data?.agencyDesignation,
        lmobileno: data?.agencyPhone,
        lemail: data?.agencyEmail,
      };
      updateSupplierStep5(stepFivePayload);
    }
    if (activeStep === 5) {
      const stepSixPayload = {
        supId: prevData[0]?.si_id,
        weavingYN: data?.HaveWeavingMill,
        labtestYN: data?.haveLabTest,
        testrpt: data?.haveTextReport,
        processdye: data?.haveWetProcess,
        product1: data?.productName1,
        product2: data?.productName2,
        product3: data?.productName3,
        capacity1: parseFloat(data?.capacity1),
        capacity2: parseFloat(data?.capacity2),
        capacity3: parseFloat(data?.capacity3),
        unit1: data?.unit1,
        unit2: data?.unit2,
        unit3: data?.unit3,
      };
      updateSupplierStep6(stepSixPayload);
    }
  };

  return (
    <div>
      <CustomStepper
        steps={steps}
        handleSave={handleNext}
        handleSubmit={handleSubmit}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {/* <button onClick={handleSubmit(handleNext)}> get</button> */}
    </div>
  );
};

export default SupplierInfo;
