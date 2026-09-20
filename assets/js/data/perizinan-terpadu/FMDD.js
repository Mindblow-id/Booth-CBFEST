// Each exported PNG is one page, ordered table.png, table-1.png, etc.
const FMDDSections = [
  {
    id: 'FMDD-MFI',
    title: 'Market Financial Infrastructure',
    menuLabel: 'Market Financial<br>Infrastructure',
    folder: 'market-financial-infrastructure',
    pages: 3,
  },
  {
    id: 'FMDD-DERIVATIVE',
    title: 'PUVA Derivative',
    folder: 'puva-derivative',
    pages: 5,
  },
  {
    id: 'FMDD-VASTRA',
    title: 'PUVA Vastra',
    folder: 'puva-vastra',
    pages: 2,
  },
  {
    id: 'FMDD-TERMINOLOGY',
    title: 'Terminology Notes',
    folder: 'terminology-notes',
    pages: 3,
  },
];

const FMDDHeader = `
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

const FMDDTitle = `
  <h3 class="w-fit mx-auto uppercase text-center mb-10" style="font-size:clamp(24px,4.45vw,48px);line-height:1.125">
    <span class="title block w-fit mx-auto" style="margin-bottom:0">Financial Market</span>
    <span class="title block w-fit mx-auto" style="margin-bottom:0">Development Department</span>
  </h3>
`;

const FMDD = {
  id: 'FMDD',
  data: `
    ${FMDDHeader}
    <div class="pt-80 px-6 pb-16 mx-auto w-full max-w-[1080px]">
      ${FMDDTitle}
      <nav aria-label="Financial Market Development Department" class="flex flex-col items-center gap-14 mt-48 mx-auto w-full max-w-[680px]">
        ${FMDDSections.map(section => `
          <c-button class="block w-full" data-next="${section.id}1">
            <p class="text-button leading-tight px-8" style="font-size:clamp(24px,3.9vw,42px)">
              ${section.menuLabel || section.title}
            </p>
          </c-button>
        `).join('')}
      </nav>
    </div>
  `,
};

const FMDDPages = FMDDSections.flatMap(section =>
  Array.from({ length: section.pages }, (_, index) => {
    const page = index + 1;
    const filename = index === 0 ? 'table.png' : `table-${index}.png`;
    return {
      id: `${section.id}${page}`,
      data: `
        ${FMDDHeader}
        <div class="pt-80 px-6 pb-12 mx-auto w-full max-w-[1080px]">
          ${FMDDTitle}
          <h4 class="text-center text-2xl text-white mb-6">${section.title}</h4>
          <img
            src="assets/img/FMDD/${section.folder}/${filename}"
            alt="${section.title} — page ${page} of ${section.pages}"
            class="block w-full max-w-[960px] h-auto mx-auto"
          >
          <p class="text-center text-lg mt-6 mb-4" aria-label="Page ${page} of ${section.pages}">
            ${page} / ${section.pages}
          </p>
          <nav aria-label="${section.title} pages" class="flex justify-between items-center gap-6">
            <c-button data-previous="FMDD" class="block flex-1 min-w-0 max-w-[320px]">
              <div class="flex justify-center items-center gap-3 px-4">
                <img src="assets/img/arrow-left-gold.svg" class="w-8" alt="">
                <p class="text-button text-xl">Back to Menu</p>
              </div>
            </c-button>
            ${index > 0 ? `
              <c-button data-previous="${section.id}${page - 1}" class="block flex-1 min-w-0 max-w-[320px]">
                <div class="flex justify-center items-center gap-3 px-4">
                  <img src="assets/img/arrow-left-gold.svg" class="w-8" alt="">
                  <p class="text-button text-xl">Previous Page</p>
                </div>
              </c-button>
            ` : ''}
            ${page < section.pages ? `
              <c-button data-next="${section.id}${page + 1}" class="block flex-1 min-w-0 max-w-[320px]">
                <div class="flex justify-center items-center gap-3 px-4">
                  <p class="text-button text-xl">Next Page</p>
                  <img src="assets/img/arrow-right-gold.svg" class="w-8" alt="">
                </div>
              </c-button>
            ` : ''}
          </nav>
        </div>
      `,
    };
  }),
);
