const PSPDTitle = 'Payment System Policy Department';
const PSPDHeader = `
  <div class="flex justify-between mx-auto w-full px-14 items-center absolute top-40">
    <c-button class="text-lg left-14 w-60" data-previous="home">
      <p class="text-button text-xl flex justify-center items-center gap-2">
        <img src="assets/img/arrow-left-gold.svg" class="w-8" alt="">
        Back to Home
      </p>
    </c-button>
    <h2 class="text-4xl xl:text-5xl text-white">Integrated Licensing</h2>
  </div>
`;

const PSPD = {
  id: 'PSPD',
  data: '',
};

const PSPDPages = Array.from({ length: 5 }, (_, index) => {
  const page = index + 1;
  const filename = index === 0 ? 'table.png' : `table-${index}.png`;
  return {
    id: index === 0 ? 'PSPD' : `PSPD${index}`,
    data: `
      ${PSPDHeader}
      <div class="pt-80 px-6 pb-12 mx-auto w-full max-w-[1080px]">
        <h3 class="title w-fit mx-auto uppercase text-center mb-10" style="font-size:clamp(26px,4.45vw,48px);line-height:1.125">
          ${PSPDTitle}
        </h3>
        <img
          src="assets/img/PSPD/${filename}"
          alt="${PSPDTitle} — page ${page} of 5"
          class="block w-full max-w-[960px] h-auto mx-auto"
        >
        <nav aria-label="${PSPDTitle} pages" class="flex justify-between items-center w-full max-w-[960px] mx-auto mt-8">
          <c-button data-previous="integrated-licensing" class="block flex-1 min-w-0 max-w-96">
            <div class="flex justify-center items-center gap-8 px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14" alt="">
              <p class="text-button text-xl">Back to Menu</p>
            </div>
          </c-button>
          <c-button data-next="${index < 4 ? (index === 0 ? 'PSPD1' : `PSPD${index + 1}`) : 'PSMD1'}" class="block flex-1 min-w-0 max-w-96">
              <div class="flex justify-center items-center gap-8 px-8">
                <p class="text-button ${index === 4 ? 'text-lg leading-tight' : 'text-xl'}">${index === 4 ? 'Payment System Management Department' : 'Next Page'}</p>
                <img src="assets/img/arrow-right-gold.svg" class="w-14" alt="">
              </div>
          </c-button>
        </nav>
      </div>
    `,
  };
});

PSPD.data = PSPDPages[0].data;
