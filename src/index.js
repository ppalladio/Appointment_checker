require('dotenv').config();
const { timeout } = require('puppeteer');
const pp = require('puppeteer');
// *-----*
const APPOINTMENT_PAGE =
    'https://icp.administracionelectronica.gob.es/icpplustieb/citar?p=8&locale=es';

console.log(process.env.USERNAME);
// *-----*
const specialty = 'Dermatología';
const appointmentType = '';
const appointmentLocation = '';
const medicalCenter = '';
const doctor = '';
/**
 * Function to log in to a specific website with provided credentials.
 *
 *
 * @return void
 */
async function Login(page) {
    await page.goto(APPOINTMENT_PAGE, { waitUntil: 'networkidle0' });
	const officesButton = await page.waitForSelector('div.fld>select#sede ');
    await officesButton.click();
    const officesAvailable = await page.$$('#sede > optgroup > option');
    const extractedData = await Promise.all(
        officesAvailable.map(async (office) => {
            return await office.evaluate((el) => ({
                id: el.value,
                textContent: el.textContent,
            }));
        }),
    );
	await page.select('#sede',extractedData[0].id)
	//@ get all the available appointments types for the selected office

	const appointmentType = await page.select('.mf-input__l',20)
	console.log(appointmentType)
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    // console.log('login completed');

    // await specialtySelector[0].click();
}
/**
 * A function to get available appointments based on specified criteria.
 *
 */
// async function GetAvailableAppointments(page) {
//     await page.goto(APPOINTMENT_SELECTION_PAGE);
// 	await page.evaluate(() => {
// 		const allSpanElements = document.querySelectorAll('span');
// 		for (const span of allSpanElements) {
// 			if (span.textContent.includes('Pedie nueva cita')) {
// 				// Perform actions on the span
// 				span.click().then(() => console.log('clicked')).finally(); // Example action
// 				break; // Stop if you only need the first match
// 			}
// 		}
// 	});
// console.log(button)
//     const specialtySelector = await page.$$(
//         ' san-select.msan-selection-v2-specialties__select > article > ion-item > div.san-select__container > ionic-selectable > div.ionic-selectable-inner > button',
//     );
//     console.log(specialtySelector);
//     await specialtySelector[0].click();

//     // const inputSpecialty = await page.$$(
//     //     'ion-searchbar>div.searchbar-input-container.sc-ion-searchbar-md>input',
//     // );
//     // console.log("inputSpecialty",inputSpecialty);
//     // const typeSpecialty = await inputSpecialty[0].type(specialty);

//     // console.log(typeSpecialty);
//     // const appointmentTypeSelector = await page.$$(
//     //     'div.msan-selection-v2-reasons > san-select-filter > div',
//     // );
//     // await appointmentTypeSelector[0].click();
//     // console.log("appointmentTypeSelector",appointmentTypeSelector);

//     // const inputAppointmentType = await page.$$(
//     //     'ion-header > ion-searchbar > div.searchbar-input-container.sc-ion-searchbar-md > input',
//     // );
//     // console.log("inputAppointmentType",inputAppointmentType);
//     // // get all the available appointments types
//     // const typeSelector = await page.$$(
//     //     'section.san-select-filter-modal-checkbox__list > article',
//     // );
//     // for (let type of typeSelector) {
//     //     const test = type.$();
//     // }

//     // const appointmentLocationSelector = await page.waitForSelector();
//     // const appointmentCenterSelector = await page.waitForSelector();
//     // const appointmentDoctorSelector = await page.waitForSelector();
//     // const asapButtonSelector = await page.waitForSelector();
//     // try {
//     //     await Promise.all([
//     //         specialtySelector.select(specialty), //!
//     //         appointmentTypeSelector.select(appointmentType),
//     //         appointmentLocationSelector.select(appointmentLocation),
//     //     ]);
//     // } catch (error) {
//     //     console.log(
//     //         'review your specialty, appointment type, appointment location',
//     //     );
//     // }
//     // if (medicalCenter || doctor) {
//     //     try {
//     //         await Promise.all([
//     //             appointmentCenterSelector.select(medicalCenter),
//     //             appointmentDoctorSelector.select(doctor),
//     //         ]);
//     //     } catch (error) {
//     //         console.log('please verify your medical center or doctor');
//     //     }
//     // }

//     // try {
//     //     await asapButtonSelector.click();
//     //     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//     // } catch (error) {
//     //     console.log(
//     //         'cant click on Lo Antes Posible button, review specialty,type and province',
//     //     );
//     // }
//     // @ next page
// }

// main
async function main() {
    const browser = await pp.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: './temp',
    });

    const page = await browser.newPage();
    const loginResult = await Login(page);
    // if (loginResult instanceof Error) {
    //     console.log('login fun error :', loginResult.message);
    //     await browser.close();
    //     return;
    // }
    // try {
    //     const button = await page.waitForSelector(
    //         'div.appointments-manager__button > san-button > article > ion-button',
    //     );
    //     await Promise.all([
    //         button.click(),
    //         page.waitForNavigation({ waitUntil: 'networkidle0' }),
    //     ]);
    // } catch (error) {}
    // await GetAvailableAppointments(page);
}
main();
