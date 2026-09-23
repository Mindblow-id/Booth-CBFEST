const SRBS = {
    id: 'SRBS',
    data: `
    <div class="flex justify-between mx-auto w-full px-14 items-center absolute top-40"> 
      <c-button
        class="text-lg  xl:top-56 left-14 xl:left-20 w-60"
        data-previous="home"
      >
        <p class="text-button text-xl flex justify-center items-center gap-2">
          <img src="assets/img/arrow-left-gold.svg" class="w-8" >
          Back to Home
        </p>
      </c-button>
      <h2
        class="xl:top-56 right-12 xl:right-18 text-4xl xl:text-5xl text-white"
      >
        Central Banking Services
      </h2>
    </div>

    <div class="cbs-page">
      <h3 class="text-5xl title mx-auto uppercase text-center w-[700px] ">
        Sub-Registry Business Process
      </h3>

      <div class="flex flex-col justify-center items-center mt-14">
        <figure class="cbs-diagram" aria-label="Sub-registry business process">
          <img src="assets/img/SRBS/illus-2.png" width="2072" height="1128" alt="Sub-registry process: service request, licensing review, banking services review, principle approval, account processing, and KSEI SID registration.">
          <img src="assets/img/SRBS/illus-1.png" width="2072" height="304" alt="Notification for parties requesting sub-registry services.">
        </figure>

        <c-card class="w-full h-[380px] mt-14">
            <div class="flex flex-col p-6">
                <p class="text-button text-center text-3xl font-semibold w-fit mx-auto"> 
                    Information
                </p>
                <div 
                  class="w-full mt-6 mb-4 h-1 rounded"
                  style="
                    background: linear-gradient(90deg, #a97c50 0%, #e7cba0 50%, #a97c50 100%);
                    opacity: 0.7;
                  "
                ></div>
                <ol class="list-decimal pl-8 pr-4 text-lg text-white" style="font-family: Arial, Helvetica, sans-serif;">
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Customer submit paperless request to get Central Banking Services through application (MoF, County Government, international financial institution, other countries central bank, & other related institution).
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Customer Service & Licensing Division conduct an administrative review of the documents submitted, simultaneously Banking Services Division conduct a substantive review of the documents submitted.
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Principle Approval from the Head of Banking Services, Licensing, and Treasury Operation Department.
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    a. The process of opening/closing/changing of Sub-Registry accounts done in BI-Core Banking System.<br>
                    b. Registering the Single Investor Identification (SID) number to KSEI (Indonesian Central Securities Depository)
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Banking Services Division send a notification letter to customer regarding to inform them about the result.
                  </li>
                </ol>
            </div>
        </c-card>

        <div class="flex justify-between items-center w-full mt-8"> 
          <c-button data-previous="lk-type-of-service" class="w-88">
            <div class="flex justify-center items-center  px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14">
              <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
        </div>
      </div>
    </div>
    `
}
