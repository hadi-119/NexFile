/* =========================================================
   NexFile Admin Panel
   Local Version - Stage 9
========================================================= */


/* =========================
   Default Data
========================= */

const defaultData = {

    folders: [

        {
            id: "programming",
            name: "برنامه نویسی",
            parent: null
        },

        {
            id: "html",
            name: "HTML",
            parent: "programming"
        },

        {
            id: "css",
            name: "CSS",
            parent: "programming"
        },

        {
            id: "javascript",
            name: "JavaScript",
            parent: "programming"
        },

        {
            id: "python",
            name: "Python",
            parent: "programming"
        },

        {
            id: "design",
            name: "طراحی",
            parent: null
        },

        {
            id: "books",
            name: "کتاب ها",
            parent: null
        },

        {
            id: "software",
            name: "نرم افزارها",
            parent: null
        },

        {
            id: "projects",
            name: "پروژه ها",
            parent: null
        }

    ],

    files: [

        {
            id: "html-file-1",
            folderId: "html",
            name: "جلسه ۱",
            description: "آموزش مقدماتی HTML",
            size: "2 MB",
            path: "files/html1.pdf"
        },

        {
            id: "html-file-2",
            folderId: "html",
            name: "جلسه ۲",
            description: "تگ‌های HTML",
            size: "3 MB",
            path: "files/html2.pdf"
        },

        {
            id: "html-file-3",
            folderId: "html",
            name: "پروژه HTML",
            description: "پروژه نهایی",
            size: "5 MB",
            path: "files/project.zip"
        }

    ]

};


/* =========================
   Storage
========================= */

const STORAGE_KEY = "nexfile_admin_data";


/* =========================
   Load Data
========================= */

function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        return JSON.parse(
            JSON.stringify(defaultData)
        );

    }

    try {

        return JSON.parse(saved);

    } catch {

        return JSON.parse(
            JSON.stringify(defaultData)
        );

    }

}


/* =========================
   Data
========================= */

let data = loadData();

let selectedFolder = null;

let selectedRealFile = null;


/* =========================
   Save Data
========================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =========================
   Sync Real NexFile Data
========================= */

function syncRealNexFileData() {

    const realFolders = [

        {
            id: "programming",
            name: "برنامه نویسی",
            parent: null
        },

        {
            id: "html",
            name: "HTML",
            parent: "programming"
        },

        {
            id: "css",
            name: "CSS",
            parent: "programming"
        },

        {
            id: "javascript",
            name: "JavaScript",
            parent: "programming"
        },

        {
            id: "python",
            name: "Python",
            parent: "programming"
        },

        {
            id: "design",
            name: "طراحی",
            parent: null
        },

        {
            id: "books",
            name: "کتاب ها",
            parent: null
        },

        {
            id: "software",
            name: "نرم افزارها",
            parent: null
        },

        {
            id: "projects",
            name: "پروژه ها",
            parent: null
        }

    ];


    realFolders.forEach(function (realFolder) {

        const exists =
            data.folders.some(function (folder) {

                return folder.id === realFolder.id;

            });


        if (!exists) {

            data.folders.push(realFolder);

        }

    });


    const realFiles = [

        {
            id: "html-file-1",
            folderId: "html",
            name: "جلسه ۱",
            description: "آموزش مقدماتی HTML",
            size: "2 MB",
            path: "files/html1.pdf"
        },

        {
            id: "html-file-2",
            folderId: "html",
            name: "جلسه ۲",
            description: "تگ‌های HTML",
            size: "3 MB",
            path: "files/html2.pdf"
        },

        {
            id: "html-file-3",
            folderId: "html",
            name: "پروژه HTML",
            description: "پروژه نهایی",
            size: "5 MB",
            path: "files/project.zip"
        }

    ];


    realFiles.forEach(function (realFile) {

        const exists =
            data.files.some(function (file) {

                return file.id === realFile.id;

            });


        if (!exists) {

            data.files.push(realFile);

        }

    });


    saveData();

}


syncRealNexFileData();


/* =========================
   Elements
========================= */

const folderCount =
    document.getElementById(
        "folderCount"
    );


const fileCount =
    document.getElementById(
        "fileCount"
    );


const systemStatus =
    document.getElementById(
        "systemStatus"
    );


const folderTree =
    document.getElementById(
        "folderTree"
    );


const fileList =
    document.getElementById(
        "fileList"
    );


const currentPath =
    document.getElementById(
        "currentPath"
    );


const saveChanges =
    document.getElementById(
        "saveChanges"
    );


const saveStatus =
    document.getElementById(
        "saveStatus"
    );


const notification =
    document.getElementById(
        "notification"
    );


const addFolderBtn =
    document.getElementById(
        "addFolderBtn"
    );


const refreshFoldersBtn =
    document.getElementById(
        "refreshFoldersBtn"
    );


const addFileBtn =
    document.getElementById(
        "addFileBtn"
    );


/* =========================
   Modals
========================= */

const folderModal =
    document.getElementById(
        "folderModal"
    );


const fileModal =
    document.getElementById(
        "fileModal"
    );


const folderName =
    document.getElementById(
        "folderName"
    );


const fileName =
    document.getElementById(
        "fileName"
    );


const fileDescription =
    document.getElementById(
        "fileDescription"
    );


const fileSize =
    document.getElementById(
        "fileSize"
    );


const filePath =
    document.getElementById(
        "filePath"
    );


/* =========================
   Real File Input
========================= */

const fileUpload =
    document.getElementById(
        "fileUpload"
    );


/* =========================
   Edit State
========================= */

let editingFolderId = null;

let editingFileId = null;


/* =========================
   Dashboard
========================= */

function updateDashboard() {

    folderCount.textContent =
        data.folders.length;

    fileCount.textContent =
        data.files.length;

    systemStatus.textContent =
        "آماده";

}


/* =========================
   Render Folders
========================= */

function renderFolders() {

    folderTree.innerHTML = "";


    const rootFolders =
        data.folders.filter(function (folder) {

            return folder.parent === null;

        });


    if (rootFolders.length === 0) {

        folderTree.innerHTML = `

            <div class="empty-state">

                هنوز پوشه‌ای ثبت نشده است.

            </div>

        `;

        return;

    }


    rootFolders.forEach(function (folder) {

        renderFolderItem(
            folder,
            0
        );

    });

}


/* =========================
   Render Folder Item
========================= */

function renderFolderItem(
    folder,
    level
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "folder-item";


    if (level > 0) {

        item.style.marginRight =
            (level * 35) + "px";

    }


    const info =
        document.createElement(
            "div"
        );


    info.className =
        "folder-info";


    const icon =
        document.createElement(
            "div"
        );


    icon.className =
        "folder-icon";


    icon.textContent =
        "📁";


    const name =
        document.createElement(
            "div"
        );


    name.className =
        "folder-name";


    name.textContent =
        folder.name;


    info.appendChild(icon);

    info.appendChild(name);


    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "folder-actions";


    /* =========================
       Open
    ========================= */

    const openButton =
        document.createElement(
            "button"
        );


    openButton.className =
        "folder-action";


    openButton.textContent =
        "باز کردن";


    openButton.onclick =
        function () {

            selectFolder(
                folder.id
            );

        };


    /* =========================
       Edit
    ========================= */

    const editButton =
        document.createElement(
            "button"
        );


    editButton.className =
        "folder-action";


    editButton.textContent =
        "ویرایش";


    editButton.onclick =
        function () {

            editFolder(
                folder.id
            );

        };


    /* =========================
       Delete
    ========================= */

    const deleteButton =
        document.createElement(
            "button"
        );


    deleteButton.className =
        "folder-action delete";


    deleteButton.textContent =
        "حذف";


    deleteButton.onclick =
        function () {

            deleteFolder(
                folder.id
            );

        };


    actions.appendChild(
        openButton
    );

    actions.appendChild(
        editButton
    );

    actions.appendChild(
        deleteButton
    );


    item.appendChild(info);

    item.appendChild(actions);


    folderTree.appendChild(item);


    /* =========================
       Children
    ========================= */

    const children =
        data.folders.filter(function (child) {

            return child.parent ===
                folder.id;

        });


    children.forEach(function (child) {

        renderFolderItem(
            child,
            level + 1
        );

    });

}


/* =========================
   Select Folder
========================= */

function selectFolder(
    folderId
) {

    const folder =
        data.folders.find(function (folder) {

            return folder.id ===
                folderId;

        });


    if (!folder) return;


    selectedFolder =
        folder.id;


    currentPath.textContent =
        getFolderPath(
            folder.id
        );


    renderFiles();

}


/* =========================
   Get Folder Path
========================= */

function getFolderPath(
    folderId
) {

    const path = [];


    let current =
        data.folders.find(function (folder) {

            return folder.id ===
                folderId;

        });


    while (current) {

        path.unshift(
            current.name
        );


        if (!current.parent) {

            break;

        }


        current =
            data.folders.find(function (folder) {

                return folder.id ===
                    current.parent;

            });

    }


    return (
        "خانه > " +
        path.join(" > ")
    );

}


/* =========================
   Render Files
========================= */

function renderFiles() {

    fileList.innerHTML = "";


    if (!selectedFolder) {

        fileList.innerHTML = `

            <div class="empty-state">

                ابتدا یک پوشه را انتخاب کنید.

            </div>

        `;

        return;

    }


    const files =
        data.files.filter(function (file) {

            return file.folderId ===
                selectedFolder;

        });


    if (files.length === 0) {

        fileList.innerHTML = `

            <div class="empty-state">

                این پوشه هنوز فایلی ندارد.

            </div>

        `;

        return;

    }


    files.forEach(function (file) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "file-item";


        const info =
            document.createElement(
                "div"
            );


        info.className =
            "file-info";


        const name =
            document.createElement(
                "div"
            );


        name.className =
            "file-name";


        name.textContent =
            file.name;


        const description =
            document.createElement(
                "div"
            );


        description.className =
            "file-description";


        description.textContent =
            file.description || "";


        const size =
            document.createElement(
                "div"
            );


        size.className =
            "file-description";


        size.textContent =
            file.size
                ? "حجم: " + file.size
                : "حجم ثبت نشده";


        const path =
            document.createElement(
                "div"
            );


        path.className =
            "file-description";


        path.textContent =
            file.path;


        info.appendChild(name);

        info.appendChild(description);

        info.appendChild(size);

        info.appendChild(path);


        const actions =
            document.createElement(
                "div"
            );


        actions.className =
            "file-actions";


        /* =========================
           Edit File
        ========================= */

        const editButton =
            document.createElement(
                "button"
            );


        editButton.className =
            "file-action";


        editButton.textContent =
            "ویرایش";


        editButton.onclick =
            function () {

                editFile(
                    file.id
                );

            };


        /* =========================
           Delete File
        ========================= */

        const deleteButton =
            document.createElement(
                "button"
            );


        deleteButton.className =
            "file-action delete";


        deleteButton.textContent =
            "حذف";


        deleteButton.onclick =
            function () {

                deleteFile(
                    file.id
                );

            };


        actions.appendChild(
            editButton
        );

        actions.appendChild(
            deleteButton
        );


        item.appendChild(info);

        item.appendChild(actions);


        fileList.appendChild(item);

    });

}


/* =========================
   Add Folder
========================= */

addFolderBtn.onclick =
    function () {

        editingFolderId = null;

        folderName.value = "";

        folderModal.classList.add(
            "active"
        );

        folderName.focus();

    };


/* =========================
   Create / Edit Folder
========================= */

document.getElementById(
    "createFolder"
).onclick =
    function () {

        const name =
            folderName.value.trim();


        if (!name) {

            showNotification(
                "نام پوشه را وارد کنید."
            );

            return;

        }


        /* =========================
           Edit Existing Folder
        ========================= */

        if (editingFolderId) {

            const folder =
                data.folders.find(function (item) {

                    return item.id ===
                        editingFolderId;

                });


            if (folder) {

                folder.name =
                    name;

            }


            saveData();

            renderFolders();

            updateDashboard();


            if (
                selectedFolder ===
                editingFolderId
            ) {

                currentPath.textContent =
                    getFolderPath(
                        editingFolderId
                    );

                renderFiles();

            }


            folderModal.classList.remove(
                "active"
            );


            editingFolderId = null;


            showNotification(
                "نام پوشه با موفقیت ویرایش شد."
            );


            return;

        }


        /* =========================
           Create New Folder
        ========================= */

        const newFolder = {

            id:
                "folder-" +
                Date.now(),

            name:
                name,

            parent:
                selectedFolder || null

        };


        data.folders.push(
            newFolder
        );


        saveData();

        renderFolders();

        updateDashboard();


        folderModal.classList.remove(
            "active"
        );


        showNotification(
            "پوشه با موفقیت ایجاد شد."
        );

    };


/* =========================
   Edit Folder
========================= */

function editFolder(
    folderId
) {

    const folder =
        data.folders.find(function (item) {

            return item.id ===
                folderId;

        });


    if (!folder) return;


    editingFolderId =
        folderId;


    folderName.value =
        folder.name;


    folderModal.classList.add(
        "active"
    );


    folderName.focus();

}


/* =========================
   Delete Folder
========================= */

function deleteFolder(
    folderId
) {

    const folder =
        data.folders.find(function (folder) {

            return folder.id ===
                folderId;

        });


    if (!folder) return;


    const childFolders =
        getAllChildFolderIds(
            folderId
        );


    const totalFolderIds = [

        folderId,

        ...childFolders

    ];


    const childFolderCount =
        childFolders.length;


    const relatedFileCount =
        data.files.filter(function (file) {

            return totalFolderIds.includes(
                file.folderId
            );

        }).length;


    let message =
        "آیا از حذف پوشه «" +
        folder.name +
        "» مطمئن هستید؟";


    if (childFolderCount > 0) {

        message +=
            "\n\n" +
            childFolderCount +
            " زیرپوشه نیز حذف خواهد شد.";

    }


    if (relatedFileCount > 0) {

        message +=
            "\n" +
            relatedFileCount +
            " فایل مرتبط نیز حذف خواهد شد.";

    }


    if (!confirm(message)) {

        return;

    }


    data.folders =
        data.folders.filter(function (item) {

            return !totalFolderIds.includes(
                item.id
            );

        });


    data.files =
        data.files.filter(function (file) {

            return !totalFolderIds.includes(
                file.folderId
            );

        });


    if (
        totalFolderIds.includes(
            selectedFolder
        )
    ) {

        selectedFolder = null;

        currentPath.textContent =
            "خانه";

        renderFiles();

    }


    saveData();

    renderFolders();

    updateDashboard();


    showNotification(
        "پوشه و اطلاعات داخل آن حذف شد."
    );

}


/* =========================
   Get All Child Folders
========================= */

function getAllChildFolderIds(
    folderId
) {

    let ids = [];


    const children =
        data.folders.filter(function (folder) {

            return folder.parent ===
                folderId;

        });


    children.forEach(function (child) {

        ids.push(
            child.id
        );


        ids =
            ids.concat(
                getAllChildFolderIds(
                    child.id
                )
            );

    });


    return ids;

}


/* =========================
   Add File
========================= */

addFileBtn.onclick =
    function () {

        if (!selectedFolder) {

            showNotification(
                "ابتدا یک پوشه را انتخاب کنید."
            );

            return;

        }


        editingFileId = null;

        selectedRealFile = null;


        fileName.value = "";

        fileDescription.value = "";

        fileSize.value = "";

        filePath.value = "";


        /* =========================
           Clear Real File Input
        ========================= */

        if (fileUpload) {

            fileUpload.value = "";

        }


        fileModal.classList.add(
            "active"
        );


        fileName.focus();

    };


/* =========================
   Format Real File Size
========================= */

function formatFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " B";

    }


    if (bytes < 1024 * 1024) {

        return (
            bytes / 1024
        ).toFixed(1) + " KB";

    }


    if (bytes < 1024 * 1024 * 1024) {

        return (
            bytes /
            (1024 * 1024)
        ).toFixed(1) + " MB";

    }


    return (
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(1) + " GB";

}


/* =========================
   Real File Selection
========================= */

if (fileUpload) {

    fileUpload.addEventListener(
        "change",
        function () {

            const selectedFile =
                fileUpload.files[0];


            if (!selectedFile) {

                selectedRealFile = null;

                return;

            }


            /* =========================
               Store Selected File
            ========================= */

            selectedRealFile =
                selectedFile;


            /* =========================
               Auto File Name
            ========================= */

            fileName.value =
                selectedFile.name;


            /* =========================
               Auto File Size
            ========================= */

            fileSize.value =
                formatFileSize(
                    selectedFile.size
                );


            /* =========================
               Auto File Path
            ========================= */

            filePath.value =
                "files/" +
                selectedFile.name;


            /* =========================
               Notification
            ========================= */

            showNotification(
                "فایل انتخاب شد."
            );

        }
    );

}


/* =========================
   Create / Edit File
========================= */

document.getElementById(
    "createFile"
).onclick =
    function () {

        const name =
            fileName.value.trim();


        const description =
            fileDescription.value.trim();


        const size =
            fileSize.value.trim();


        const path =
            filePath.value.trim();


        if (!name) {

            showNotification(
                "نام فایل را وارد کنید."
            );

            return;

        }


        if (!path) {

            showNotification(
                "مسیر فایل را وارد کنید."
            );

            return;

        }


        /* =========================
           Edit Existing File
        ========================= */

        if (editingFileId) {

            const file =
                data.files.find(function (item) {

                    return item.id ===
                        editingFileId;

                });


            if (file) {

                file.name =
                    name;

                file.description =
                    description;

                file.size =
                    size;

                file.path =
                    path;

            }


            saveData();

            renderFiles();

            updateDashboard();


            fileModal.classList.remove(
                "active"
            );


            editingFileId = null;

            selectedRealFile = null;


            if (fileUpload) {

                fileUpload.value = "";

            }


            showNotification(
                "اطلاعات فایل با موفقیت ویرایش شد."
            );


            return;

        }


        /* =========================
           Create New File
        ========================= */

        const newFile = {

            id:
                "file-" +
                Date.now(),

            folderId:
                selectedFolder,

            name:
                name,

            description:
                description,

            size:
                size,

            path:
                path

        };


        data.files.push(
            newFile
        );


        saveData();

        renderFiles();

        updateDashboard();


        fileModal.classList.remove(
            "active"
        );


        editingFileId = null;

        selectedRealFile = null;


        if (fileUpload) {

            fileUpload.value = "";

        }


        showNotification(
            "فایل با موفقیت اضافه شد."
        );

    };


/* =========================
   Edit File
========================= */

function editFile(
    fileId
) {

    const file =
        data.files.find(function (item) {

            return item.id ===
                fileId;

        });


    if (!file) return;


    editingFileId =
        fileId;


    selectedRealFile = null;


    fileName.value =
        file.name || "";


    fileDescription.value =
        file.description || "";


    fileSize.value =
        file.size || "";


    filePath.value =
        file.path || "";


    if (fileUpload) {

        fileUpload.value = "";

    }


    fileModal.classList.add(
        "active"
    );


    fileName.focus();

}


/* =========================
   Delete File
========================= */

function deleteFile(
    fileId
) {

    const file =
        data.files.find(function (file) {

            return file.id ===
                fileId;

        });


    if (!file) return;


    if (
        !confirm(
            "آیا از حذف فایل «" +
            file.name +
            "» مطمئن هستید؟"
        )
    ) {

        return;

    }


    data.files =
        data.files.filter(function (file) {

            return file.id !==
                fileId;

        });


    saveData();

    renderFiles();

    updateDashboard();


    showNotification(
        "فایل حذف شد."
    );

}


/* =========================
   Save Button
========================= */

saveChanges.onclick =
    function () {

        saveData();


        saveStatus.textContent =
            "تغییرات ذخیره شد ✓";


        showNotification(
            "اطلاعات در سیستم ذخیره شد."
        );


        setTimeout(
            function () {

                saveStatus.textContent =
                    "";

            },
            3000
        );

    };


/* =========================
   Refresh
========================= */

refreshFoldersBtn.onclick =
    function () {

        data =
            loadData();


        selectedFolder = null;

        selectedRealFile = null;


        currentPath.textContent =
            "خانه";


        renderFolders();

        renderFiles();

        updateDashboard();


        showNotification(
            "اطلاعات بروزرسانی شد."
        );

    };


/* =========================
   Close Folder Modal
========================= */

document.getElementById(
    "cancelFolder"
).onclick =
    function () {

        editingFolderId = null;

        folderModal.classList.remove(
            "active"
        );

    };


document.getElementById(
    "closeFolderModal"
).onclick =
    function () {

        editingFolderId = null;

        folderModal.classList.remove(
            "active"
        );

    };


/* =========================
   Close File Modal
========================= */

document.getElementById(
    "cancelFile"
).onclick =
    function () {

        editingFileId = null;

        selectedRealFile = null;


        if (fileUpload) {

            fileUpload.value = "";

        }


        fileModal.classList.remove(
            "active"
        );

    };


document.getElementById(
    "closeFileModal"
).onclick =
    function () {

        editingFileId = null;

        selectedRealFile = null;


        if (fileUpload) {

            fileUpload.value = "";

        }


        fileModal.classList.remove(
            "active"
        );

    };


/* =========================
   Close Modal Outside
========================= */

folderModal.onclick =
    function (event) {

        if (
            event.target ===
            folderModal
        ) {

            editingFolderId = null;

            folderModal.classList.remove(
                "active"
            );

        }

    };


fileModal.onclick =
    function (event) {

        if (
            event.target ===
            fileModal
        ) {

            editingFileId = null;

            selectedRealFile = null;


            if (fileUpload) {

                fileUpload.value = "";

            }


            fileModal.classList.remove(
                "active"
            );

        }

    };


/* =========================
   Escape Key
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            editingFolderId = null;

            editingFileId = null;

            selectedRealFile = null;


            if (fileUpload) {

                fileUpload.value = "";

            }


            folderModal.classList.remove(
                "active"
            );


            fileModal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================
   Notification
========================= */

let notificationTimer;


function showNotification(
    message
) {

    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            function () {

                notification.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================
   Start
========================= */

renderFolders();

renderFiles();

updateDashboard();
