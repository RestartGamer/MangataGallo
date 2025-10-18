 //pagnination system
 window.addEventListener("load", ()=> {


                function generatePagination(current, total, range = 2) {
                    const pages = [];
                    const firstPage = 1;
                    const lastPage = total;

                    // Always add first page
                    pages.push(firstPage);

                    // Add left ellipsis if needed
                    if (current - range > firstPage + 1) {
                        pages.push("...");
                    }

                        for (let i = Math.max(1,current - range); i <= range*3; i++) {
                        if (i > firstPage && i < lastPage) {
                            pages.push(i);
                        }
                    }
                    // Add middle range (around current)
                    for (let i = Math.max(range*3+1,current - range); i <= current + range; i++) {
                        if (i > firstPage && i < lastPage) {
                            pages.push(i);
                        }
                    }
                    

                    // Add right ellipsis if needed
                    if (current + range < lastPage - 1) {
                        pages.push("...");
                    }

                    // Always add last page
                    if (lastPage !== firstPage) {
                        pages.push(lastPage);
                    }

                    return pages;
            }

            // Example
            console.log(generatePagination(500, 1000, 2));
            // -> [1, "...", 498, 499, 500, 501, 502, "...", 1000]


//Render in HTML
function renderPagination(current, total) {
    const pagination = document.querySelector(".pagination-advanced__button-content");
    pagination.innerHTML = "";

    const pages = generatePagination(current, total, 2);


    const buttonLeft = document.createElement("button");
    const buttonRight = document.createElement("button");
    buttonLeft.textContent = "<";
    buttonRight.textContent = ">";
    buttonLeft.classList.add("pagination-advanced__button-left");
    buttonRight.classList.add("pagination-advanced__button-right");
    pagination.appendChild(buttonLeft);


    pages.forEach(page => {
        

        const buttonMiddle = document.createElement("button");
        
        buttonMiddle.type = "button";
        if (page === "...") {
            buttonMiddle.textContent = "...";
            buttonMiddle.disabled = true; // not clickable
        } else {
            buttonMiddle.textContent = page;
            buttonMiddle.classList.add("pagination-advanced__button-middle");
            if (page === current) {
                buttonMiddle.classList.add("active");
            }
            buttonMiddle.addEventListener("click", () => {
                event.preventDefault();
                renderPagination(page, total); // re-render with new current
            });
            
        }
        pagination.appendChild(buttonMiddle);
    });


    pagination.appendChild(buttonRight);
    buttonLeft.type = "button";
    buttonRight.type = "button";
    
    buttonLeft.addEventListener("click", () => {
                event.preventDefault();
                renderPagination(Math.max(1, current-1), total); // re-render with new current
    });
    buttonRight.addEventListener("click", () => {
                event.preventDefault();
                renderPagination(Math.min(total, current+1), total); // re-render with new current
    });

}

// Initialize
renderPagination(500, 1000);





 });