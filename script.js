// =========================
// NEXFILE DATA
// اتصال سایت به اطلاعات پنل مدیریت
// =========================

const ADMIN_STORAGE_KEY = "nexfile_admin_data";

// اطلاعات پیش‌فرض سایت
const defaultExplorer = [
    {
        id: "programming",
        type: "folder",
        name: "برنامه نویسی",
        children: [
            {
                id: "html",
                type: "folder",
                name: "HTML",
                children: [
                    {
                        name: "جلسه ۱",
                        description: "آموزش مقدماتی HTML",
                        size: "2 MB",
                        file: "files/html1.pdf"
                    },
                    {
                        name: "جلسه ۲",
                        description: "تگ‌های HTML",
                        size: "3 MB",
                        file: "files/html2.pdf"
                    },
                    {
                        name: "پروژه HTML",
                        description: "پروژه نهایی",
                        size: "5 MB",
                        file: "files/project.zip"
                    }
                ]
            },
            {
                id: "css",
                type: "folder",
                name: "CSS",
                children: []
            },
            {
                id: "javascript",
                type: "folder",
                name: "JavaScript",
                children: []
            },
            {
                id: "python",
                type: "folder",
                name: "Python",
                children: []
            }
        ]
    },
    {
        id: "design",
        type: "folder",
        name: "طراحی",
        children: []
    },
    {
        id: "books",
        type: "folder",
        name: "کتاب ها",
        children: []
    },
    {
        id: "software",
        type: "folder",
        name: "نرم افزارها",
        children: []
    },
    {
        id: "projects",
        type: "folder",
        name: "پروژه ها",
        children: []
    }
];


// =========================
// تبدیل اطلاعات پنل مدیریت
// به ساختار explorer سایت
// =========================

function convertAdminDataToExplorer(data) {

    if (
        !data ||
        !Array.isArray(data.folders) ||
        !Array.isArray(data.files)
    ) {
        return null;
    }

    function buildFolder(folderId) {

        const folder = data.folders.find(
            item => item.id === folderId
        );

        if (!folder) return null;

        const children = [];

        // پوشه‌های داخل این پوشه
        data.folders
            .filter(item => item.parent === folderId)
            .forEach(childFolder => {

                const convertedFolder =
                    buildFolder(childFolder.id);

                if (convertedFolder) {
                    children.push(convertedFolder);
                }

            });


        // فایل‌های داخل این پوشه
        data.files
            .filter(file => file.folderId === folderId)
            .forEach(file => {

                children.push({

                    name: file.name || "فایل بدون نام",

                    description:
                        file.description || "",

                    size:
                        file.size || "",

                    // مسیر واقعی فایل
                    // پنل مدیریت مسیر را در path ذخیره می‌کند
                    file:
                        file.path ||
                        file.file ||
                        ""

                });

            });


        return {

            id: folder.id,

            type: "folder",

            name: folder.name,

            children: children

        };
    }


    // فقط پوشه‌های اصلی
    const rootFolders =
        data.folders.filter(
            folder =>
                folder.parent === null ||
                folder.parent === undefined ||
                folder.parent === ""
        );


    return rootFolders
        .map(folder => buildFolder(folder.id))
        .filter(Boolean);
}


// =========================
// دریافت اطلاعات از پنل
// =========================

function loadExplorerData() {

    try {

        const savedData =
            localStorage.getItem(
                ADMIN_STORAGE_KEY
            );


        if (!savedData) {

            return defaultExplorer;

        }


        const data =
            JSON.parse(savedData);


        const convertedData =
            convertAdminDataToExplorer(data);


        if (
            Array.isArray(convertedData) &&
            convertedData.length > 0
        ) {

            return convertedData;

        }

    }
    catch (error) {

        console.warn(
            "خطا در خواندن اطلاعات پنل مدیریت:",
            error
        );

    }


    return defaultExplorer;
}


// اطلاعات نهایی سایت
const explorer =
    loadExplorerData();


// =========================
// FOLDER FUNCTIONS
// =========================

function getAllFiles(items, path = []) {

    let result = [];

    items.forEach(item => {

        if (item.type === "folder") {

            result.push(
                ...getAllFiles(
                    item.children,
                    [...path, item.name]
                )
            );

        }
        else {

            result.push({

                ...item,

                path: [...path]

            });

        }

    });

    return result;
}



function findFolderByPath(items, path) {

    let current = items;


    for (const name of path) {

        const folder =
            current.find(item =>
                item.type === "folder" &&
                item.name === name
            );


        if (!folder) return null;


        current =
            folder.children;

    }


    return current;
}



function openFolderByPath(path) {

    history = [];


    let current = explorer;


    path.forEach(name => {

        history.push([...current]);


        const folder =
            current.find(item =>
                item.type === "folder" &&
                item.name === name
            );


        if (!folder) return;


        current =
            folder.children;

    });


    currentFolder =
        current;


    currentPath =
        [...path];


    updateBreadcrumb();


    renderExplorer(
        currentFolder
    );
}


// =========================
// BREADCRUMB
// =========================

function updateBreadcrumb() {

    const breadcrumb =
        document.getElementById(
            "breadcrumb"
        );


    if (!breadcrumb) return;


    breadcrumb.innerHTML = "";


    // خانه
    const home =
        document.createElement("a");


    home.textContent =
        "خانه";


    home.href =
        "#";


    home.addEventListener(
        "click",
        e => {

            e.preventDefault();

            openFolderByPath([]);

        }
    );


    breadcrumb.appendChild(home);


    currentPath.forEach(
        (name, index) => {

            const separator =
                document.createElement(
                    "span"
                );


            separator.textContent =
                " > ";


            breadcrumb.appendChild(
                separator
            );


            if (
                index ===
                currentPath.length - 1
            ) {

                const span =
                    document.createElement(
                        "span"
                    );


                span.textContent =
                    name;


                breadcrumb.appendChild(
                    span
                );

            }
            else {

                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    "#";


                link.textContent =
                    name;


                link.addEventListener(
                    "click",
                    e => {

                        e.preventDefault();


                        openFolderByPath(
                            currentPath.slice(
                                0,
                                index + 1
                            )
                        );

                    }
                );


                breadcrumb.appendChild(
                    link
                );

            }

        }
    );
}


// =========================
// GLOBAL VARIABLES
// =========================

let currentFolder =
    explorer;


let history = [];


let currentPath = [];


const filesGrid =
    document.getElementById(
        "filesGrid"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


const previewModal =
    document.getElementById(
        "previewModal"
    );


const previewContent =
    document.getElementById(
        "previewContent"
    );


const previewTitle =
    document.getElementById(
        "previewTitle"
    );


const previewDownload =
    document.getElementById(
        "previewDownload"
    );


const closePreview =
    document.getElementById(
        "closePreview"
    );


// =========================
// PREVIEW
// =========================

function openPreview(file) {

    previewTitle.textContent =
        file.name;


    previewDownload.href =
        file.file;


    previewContent.innerHTML =
        "";


    const extension =
        file.file
            .split(".")
            .pop()
            .toLowerCase();


    if (
        [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp"
        ].includes(extension)
    ) {

        previewContent.innerHTML = `

            <img
                src="${file.file}"
                alt="${file.name}"
            >

        `;

    }

    else if (
        extension === "pdf"
    ) {

        previewContent.innerHTML = `

            <iframe
                src="${file.file}">
            </iframe>

        `;

    }

    else if (
        [
            "mp4",
            "webm",
            "ogg"
        ].includes(extension)
    ) {

        previewContent.innerHTML = `

            <video controls>

                <source
                    src="${file.file}"
                >

            </video>

        `;

    }

    else if (
        [
            "mp3",
            "wav"
        ].includes(extension)
    ) {

        previewContent.innerHTML = `

            <audio controls>

                <source
                    src="${file.file}"
                >

            </audio>

        `;

    }

    else {

        previewContent.innerHTML = `

            <p>
                پیش‌نمایش این فایل امکان‌پذیر نیست.
            </p>

        `;

    }


    previewModal.classList.add(
        "show"
    );
}


// =========================
// RENDER EXPLORER
// =========================

function renderExplorer(items) {

    if (history.length > 0) {

        backButton.style.display =
            "inline-block";

    }
    else {

        backButton.style.display =
            "none";

    }


    if (items.length === 0) {

        renderFiles([]);

        return;

    }


    if (
        items[0].type === "folder"
    ) {

        renderFolders(items);

        return;

    }


    renderFiles(items);
}


// =========================
// RENDER FOLDERS
// =========================

function renderFolders(folderList) {

    filesGrid.innerHTML =
        "";


    folderList.forEach(folder => {

        filesGrid.innerHTML += `

            <div
                class="file-card folder-card"
                data-id="${folder.id}"
            >

                <h3 class="file-name">

                    📁 ${folder.name}

                </h3>


                <p class="file-description">

                    پوشه

                </p>

            </div>

        `;

    });


    document
        .querySelectorAll(
            ".folder-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const folder =
                        folderList.find(
                            item =>
                                item.id ===
                                card.dataset.id
                        );


                    if (!folder) return;


                    history.push(
                        [...currentFolder]
                    );


                    currentPath.push(
                        folder.name
                    );


                    currentFolder =
                        folder.children;


                    updateBreadcrumb();


                    if (
                        currentFolder.length ===
                        0
                    ) {

                        renderExplorer([]);

                        return;

                    }


                    renderExplorer(
                        currentFolder
                    );

                }
            );

        });
}


// =========================
// RENDER FILES
// =========================

function renderFiles(items) {

    if (!filesGrid) return;


    filesGrid.innerHTML =
        "";


    const currentFiles =
        items;


    if (items.length === 0) {

        filesGrid.innerHTML = `

            <div class="empty-search">

                <h3>

                    فایلی پیدا نشد 😕

                </h3>

            </div>

        `;

        return;

    }


    items.forEach(file => {

        filesGrid.innerHTML += `

            <div class="file-card">

                <h3 class="file-name">

                    ${file.name}

                </h3>


                <p class="file-description">

                    ${file.description || ""}

                </p>


                ${
                    file.size
                    ?
                    `

                    <span class="file-size">

                        حجم: ${file.size}

                    </span>

                    `
                    :
                    ""
                }


                <div class="file-buttons">

                    ${
                        file.file &&
                        file.file
                            .toLowerCase()
                            .endsWith(".zip")

                        ?

                        `

                        <a
                            href="${file.file}"
                            download
                            class="download-btn full-width"
                        >

                            دانلود

                        </a>

                        `

                        :

                        `

                        ${
                            file.path

                            ?

                            `

                            <button
                                class="goto-folder-btn"
                                data-path="${file.path.join("|")}"
                            >

                                📂 برو به پوشه

                            </button>

                            `

                            :

                            ""

                        }


                        <button
                            class="view-btn preview-btn"
                            data-file="${file.name}"
                        >

                            نمایش

                        </button>


                        <a
                            href="${file.file}"
                            download
                            class="download-btn"
                        >

                            دانلود

                        </a>

                        `

                    }

                </div>

            </div>

        `;

    });


    // =========================
    // GO TO FOLDER
    // =========================

    document
        .querySelectorAll(
            ".goto-folder-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const path =
                        button.dataset.path
                            .split("|");


                    const folder =
                        findFolderByPath(
                            explorer,
                            path
                        );


                    if (!folder) return;


                    openFolderByPath(
                        path
                    );


                    if (searchInput) {

                        searchInput.value =
                            "";

                    }


                    if (clearSearch) {

                        clearSearch.classList.remove(
                            "show"
                        );

                    }


                    if (searchInput) {

                        searchInput.blur();

                    }

                }
            );

        });


    // =========================
    // PREVIEW BUTTON
    // =========================

    document
        .querySelectorAll(
            ".preview-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const file =
                        currentFiles.find(
                            item =>
                                item.name ===
                                button.dataset.file
                        );


                    if (file) {

                        openPreview(file);

                    }

                }
            );

        });

}


// =========================
// FIRST RENDER
// =========================

renderExplorer(
    currentFolder
);


// =========================
// LIVE SEARCH
// =========================

const searchInput =
    document.getElementById(
        "searchInput"
    );


const clearSearch =
    document.getElementById(
        "clearSearch"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const value =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (clearSearch) {

                clearSearch.classList.toggle(
                    "show",
                    value !== ""
                );

            }


            const allFiles =
                getAllFiles(
                    explorer
                );


            const filteredFiles =
                allFiles.filter(file => {

                    return (

                        file.name
                            .toLowerCase()
                            .includes(value)

                        ||

                        (
                            file.description ||
                            ""
                        )
                            .toLowerCase()
                            .includes(value)

                    );

                });


            if (value === "") {

                renderExplorer(
                    currentFolder
                );

                return;

            }


            renderFiles(
                filteredFiles
            );

        }
    );


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                searchInput.value =
                    "";


                renderExplorer(
                    currentFolder
                );


                clearSearch.classList.remove(
                    "show"
                );


                searchInput.focus();

            }
        );

    }

}


// =========================
// MOBILE MENU
// =========================

const hamburger =
    document.getElementById(
        "hamburger"
    );


const nav =
    document.getElementById(
        "nav"
    );


const overlay =
    document.getElementById(
        "menuOverlay"
    );


if (hamburger) {

    hamburger.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "active"
            );


            hamburger.classList.toggle(
                "active"
            );

        }
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        () => {

            nav.classList.remove(
                "active"
            );


            overlay.classList.remove(
                "active"
            );


            hamburger.classList.remove(
                "active"
            );

        }
    );

}


// =========================
// DARK MODE
// =========================

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const themeToggleDesktop =
    document.getElementById(
        "themeToggleDesktop"
    );


function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    if (
        document.body.classList.contains(
            "dark"
        )
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );


        if (themeToggle) {

            themeToggle.innerHTML =
                "☀️ حالت روشن";

        }


        if (themeToggleDesktop) {

            themeToggleDesktop.innerHTML =
                "☀️";

        }

    }

    else {

        localStorage.setItem(
            "theme",
            "light"
        );


        if (themeToggle) {

            themeToggle.innerHTML =
                "🌙 حالت تیره";

        }


        if (themeToggleDesktop) {

            themeToggleDesktop.innerHTML =
                "🌙";

        }

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


if (themeToggleDesktop) {

    themeToggleDesktop.addEventListener(
        "click",
        toggleTheme
    );

}


const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );


    if (themeToggle) {

        themeToggle.innerHTML =
            "☀️ حالت روشن";

    }

}

else {

    if (themeToggle) {

        themeToggle.innerHTML =
            "🌙 حالت تیره";

    }

}


// =========================
// CLOSE MENU AFTER CLICK
// =========================

document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (nav) {

                    nav.classList.remove(
                        "active"
                    );

                }


                if (overlay) {

                    overlay.classList.remove(
                        "active"
                    );

                }


                if (hamburger) {

                    hamburger.classList.remove(
                        "active"
                    );

                }

            }
        );

    });


document.addEventListener(
    "click",
    e => {

        if (

            nav &&

            hamburger &&

            nav.classList.contains(
                "active"
            ) &&

            !nav.contains(
                e.target
            ) &&

            !hamburger.contains(
                e.target
            )

        ) {

            nav.classList.remove(
                "active"
            );


            hamburger.classList.remove(
                "active"
            );

        }

    }
);


// =========================
// HEADER SHADOW ON SCROLL
// =========================

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(
                ".header"
            );


        if (!header) return;


        if (
            window.scrollY > 20
        ) {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.1)";

        }

        else {

            header.style.boxShadow =
                "none";

        }

    }
);


// =========================
// BACK TO TOP
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const backToTop =
            document.getElementById(
                "backToTop"
            );


        if (backToTop) {

            window.addEventListener(
                "scroll",
                () => {

                    if (
                        window.scrollY > 300
                    ) {

                        backToTop.classList.add(
                            "show"
                        );

                    }

                    else {

                        backToTop.classList.remove(
                            "show"
                        );

                    }

                }
            );


            backToTop.addEventListener(
                "click",
                () => {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        }


        // =========================
        // CARD ANIMATION
        // =========================

        const cards =
            document.querySelectorAll(
                ".file-card"
            );


        if (cards.length > 0) {

            cards.forEach(card => {

                card.classList.add(
                    "hidden"
                );

            });


            const observer =
                new IntersectionObserver(

                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "show"
                                    );


                                    entry.target.classList.remove(
                                        "hidden"
                                    );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.15
                    }

                );


            cards.forEach(card => {

                observer.observe(
                    card
                );

            });

        }

    }
);


// =========================
// LOADING SCREEN
// =========================

document.body.classList.add(
    "loading"
);


window.addEventListener(
    "load",
    () => {

        const loader =
            document.getElementById(
                "loader"
            );


        if (!loader) {

            document.body.classList.remove(
                "loading"
            );

            return;

        }


        setTimeout(
            () => {

                loader.classList.add(
                    "hide"
                );


                document.body.classList.remove(
                    "loading"
                );

            },
            700
        );

    }
);


// =========================
// CLOSE PREVIEW MODAL
// =========================

function closePreviewModal() {

    if (!previewModal) return;


    previewModal.classList.remove(
        "show"
    );


    if (previewContent) {

        const media =
            previewContent.querySelector(
                "video, audio"
            );


        if (media) {

            media.pause();

            media.currentTime = 0;

        }


        setTimeout(
            () => {

                previewContent.innerHTML =
                    "";

            },
            300
        );

    }

}


// =========================
// CLOSE PREVIEW
// =========================

if (closePreview) {

    closePreview.addEventListener(
        "click",
        closePreviewModal
    );

}


if (previewModal) {

    previewModal.addEventListener(
        "click",
        e => {

            if (
                e.target ===
                previewModal
            ) {

                closePreviewModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
        ) {

            closePreviewModal();

        }

    }
);


// =========================
// BACK BUTTON
// =========================

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            if (
                history.length === 0
            ) return;


            currentFolder =
                history.pop();


            currentPath.pop();


            renderExplorer(
                currentFolder
            );


            updateBreadcrumb();

        }
    );

}
