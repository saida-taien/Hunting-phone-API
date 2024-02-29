const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll);
    
    console.log(phones.length);
    if(phones.length === 0)
    {
        noResultSection.classList.remove('hidden');
    }
    
}

const noResultSection = document.getElementById('no-result-section');


const displayPhones = (phones, isShowAll) => {

    noResultSection.classList.add('hidden');

    //step-1: get element
    const phonesContainer = document.getElementById('phones-container');


    //clear phone container cards before adding new cards
    phonesContainer.textContent = '';


    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById("show-all-container");
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log("is Show All" , isShowAll);

    //display only first 12 phone if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone);

        //step-2 : create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact  bg-base-100 shadow-xl p-4`;

        //step-3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
            <button onclick = "handleShowDetails('${phone.slug}') ; show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>

        `
        //step-4 : appendChild
        phonesContainer.appendChild(phoneCard);
    });

    // hide loading spinner after loading data
    toggleLoadingSpinner(false);
}







//handle search button

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


//Handle show more button
const handleShowMore = () => {
    handleSearch(true);
}




// Show details Part...

const handleShowDetails = async (id) => {
    // console.log("show detail clicked " , id);

    //load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

//show phone details

const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;



    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.classList = 'p-4'
    showDetailsContainer.innerHTML = `
        <div class = "flex justify-center items-center">
        <img src = "${phone.image}" />
        </div>
        <div class= "space-y-2">
        <p><span class = "font-semibold">Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p><span class = "font-semibold">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class = "font-semibold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class = "font-semibold">Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p><span class = "font-semibold">Slug: </span>${phone?.slug}</p>
        <p><span class = "font-semibold">Release Date: </span>${phone?.releaseDate}</p> 
        <p><span class = "font-semibold">Brand: </span>${phone?.brand}</p> 
        <p><span class = "font-semibold">GPS : </span>${phone?.others?.GPS || 'No GPS available'}</p>
        <p><span class = "font-semibold">GPS : </span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS available in this device(using ternary operator)'}</p>  
        </div>
    `


    //show the modal
    show_details_modal.showModal();
}

