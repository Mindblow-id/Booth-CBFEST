const CAABP = {
    id: 'CAABP',
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
      <h3 class="text-5xl title w-fit mx-auto uppercase text-center" style="margin-bottom:24px">
        Current Account Administration Business Process
      </h3>

      <p class="mt-8 text-center text-3xl text-shadow" style="font-family: Arial, Helvetica, sans-serif;">
        External party current account administration services provided by Bank Indonesia, which is a means of administering savings, deposit and withdrawal transactions that can be carried out in accordance with the provisions and requirements set by Bank Indonesia.
      </p>

      <div class="flex flex-col justify-center items-center mt-6">
        <figure class="cbs-diagram" aria-label="Current account administration process">
          <img class="cbs-glow" src="assets/img/CAABP/caaabp.png" width="2073" height="1148" alt="Current account administration flow from the customer's request through the licensing and banking services divisions, account processing, and notification.">
          <img class="cbs-diagram-legend" src="assets/img/CAABP/moc.png" width="740" height="200" alt="Means of communication.">
        </figure>
        <c-card class="w-full h-[380px] mt-6">
            <div class="flex flex-col p-6">
                <p class="text-button text-center text-3xl font-semibold w-fit mx-auto"> Information </p>
                <div 
                  class="w-full mt-6 mb-4 h-1 rounded"
                  style="
                    background: linear-gradient(90deg, #a97c50 0%, #e7cba0 50%, #a97c50 100%);
                    opacity: 0.7;
                  "
                ></div>
                <ol class="list-decimal pl-8 pr-4 text-xl text-white" style="font-family: Arial, Helvetica, sans-serif;">
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Customer submit paperless request to get Central Banking Services through application (MoF, OJK, LPS, international financial institution, other countries central bank, &amp; other related institution).
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Customer Service &amp; Licensing Division conduct an administrative review of the documents submitted, simultaneously Banking Services Division conduct a substantive review of the documents submitted.
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    The process of opening/closing/changing of current accounts done in BI-Core Banking System.
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    Banking Services Division send a notification letter to customer regarding to inform them about the result.
                  </li>
                </ol>
            </div>
        </c-card>

        <div class="flex justify-between items-center w-full mt-6">
          <c-button data-previous="lk-type-of-service" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14">
              <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
          <c-button data-next="LCTS" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <p class="text-button text-xl"> Letter of Credit Transaction Services </p>
              <img src="assets/img/arrow-right-gold.svg" class="w-14">
            </div>  
          </c-button>
        </div>
      </div>
    </div>
    `
}
