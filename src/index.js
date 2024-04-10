require('dotenv').config();
const pp = require('puppeteer');

// *-----*

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
    await page.goto(LOGIN_PAGE, {
        timeout: 10000,
    });
    // acceptCookies
    setTimeout(() => {}, 10000);
    // input login details
    try {
        const usernameField = await page.waitForSelector('#ion-input-0');
        await usernameField.type(USERNAME);

        const passwordField = await page.waitForSelector('#ion-input-1');
        await passwordField.type(PASSWORD);

        await page.click('.san-button', {
            waitUntil: 'networkidle0',
        });
        // await page.keyboard.press('Esc');
    } catch (error) {
        console.log('credential error', error);
        return error;
    }
    await page.goto(APPOINTMENT_PAGE, { timeout: 10000 });
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    // console.log('login completed');
}
/**
 * A function to get available appointments based on specified criteria.
 *
 */
async function GetAvailableAppointments(page) {
    const specialtySelector = await page.$$(
        ' div.msan-appointments-selection-v2__selectors-container > msan-selection-v2-specialties > san-select > article > ion-item > div.san-select__container > ionic-selectable > div.ionic-selectable-inner > button',
    );
    console.log(specialtySelector);
    await specialtySelector[0].click();

    const inputSpecialty = await page.$$(
        'ion-searchbar>div.searchbar-input-container.sc-ion-searchbar-md>input',
    );
    console.log(inputSpecialty);
    // const typeSpecialty = await inputSpecialty[0].type(specialty);

    // console.log(typeSpecialty);
    const appointmentTypeSelector = await page.$$(
        'div.msan-selection-v2-reasons > san-select-filter > div',
    );
    await appointmentTypeSelector[0].click();
    console.log(appointmentTypeSelector);

    const inputAppointmentType = await page.$$(
        'ion-header > ion-searchbar > div.searchbar-input-container.sc-ion-searchbar-md > input',
    );
    console.log(inputAppointmentType);
    // get all the available appointments types
    const typeSelector = await page.$$(
        'section.san-select-filter-modal-checkbox__list > article',
    );
    for (let type of typeSelector) {
        const test = type.$();
    }

    // const appointmentLocationSelector = await page.waitForSelector();
    // const appointmentCenterSelector = await page.waitForSelector();
    // const appointmentDoctorSelector = await page.waitForSelector();
    // const asapButtonSelector = await page.waitForSelector();
    // try {
    //     await Promise.all([
    //         specialtySelector.select(specialty), //!
    //         appointmentTypeSelector.select(appointmentType),
    //         appointmentLocationSelector.select(appointmentLocation),
    //     ]);
    // } catch (error) {
    //     console.log(
    //         'review your specialty, appointment type, appointment location',
    //     );
    // }
    // if (medicalCenter || doctor) {
    //     try {
    //         await Promise.all([
    //             appointmentCenterSelector.select(medicalCenter),
    //             appointmentDoctorSelector.select(doctor),
    //         ]);
    //     } catch (error) {
    //         console.log('please verify your medical center or doctor');
    //     }
    // }

    // try {
    //     await asapButtonSelector.click();
    //     await page.waitForNavigation({ waitUntil: 'networkidle0' });
    // } catch (error) {
    //     console.log(
    //         'cant click on Lo Antes Posible button, review specialty,type and province',
    //     );
    // }
    // @ next page
}

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
    try {
        const button = await page.waitForSelector(
            'div.appointments-manager__button > san-button > article > ion-button',
        );
        await Promise.all([
            button.click(),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
    } catch (error) {}
    await GetAvailableAppointments(page);
}
main();
