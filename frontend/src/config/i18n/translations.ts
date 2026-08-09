export type TranslationKey =
  | "app.title"
  | "app.description"
  | "nav.dashboard"
  | "nav.myUrls"
  | "nav.documentation"
  | "nav.github"
  | "nav.resources"
  | "nav.profile"
  | "nav.logout"
  | "action.createUrl"
  | "action.create"
  | "action.edit"
  | "action.delete"
  | "action.cancel"
  | "action.save"
  | "action.copy"
  | "action.copied"
  | "action.open"
  | "action.stats"
  | "action.search"
  | "action.signIn"
  | "action.firstPage"
  | "action.prevPage"
  | "action.nextPage"
  | "action.lastPage"
  | "aria.openMenu"
  | "aria.closeMenu"
  | "aria.collapseSidebar"
  | "aria.expandSidebar"
  | "aria.userMenu"
  | "aria.selectLanguage"
  | "aria.toggleTheme"
  | "aria.themeToLight"
  | "aria.themeToDark"
  | "dashboard.heading"
  | "dashboard.totalUrls"
  | "dashboard.totalClicks"
  | "dashboard.activeUrls"
  | "dashboard.recentUrls"
  | "dashboard.noUrls"
  | "dashboard.createFirstUrl"
  | "urls.heading"
  | "urls.searchPlaceholder"
  | "urls.noUrlsFound"
  | "urls.rowSelected"
  | "urls.results"
  | "urls.pageOf"
  | "table.shortUrl"
  | "table.originalUrl"
  | "table.clicks"
  | "table.created"
  | "table.actions"
  | "detail.heading"
  | "detail.shortUrl"
  | "detail.originalUrl"
  | "detail.qrCode"
  | "detail.notFound"
  | "detail.copiedClipboard"
  | "detail.failedCopy"
  | "detail.updateDestination"
  | "detail.editSubtitle"
  | "delete.title"
  | "delete.description"
  | "delete.confirm"
  | "profile.heading"
  | "profile.infoTitle"
  | "profile.infoDesc"
  | "profile.name"
  | "profile.email"
  | "profile.saveChanges"
  | "profile.passwordTitle"
  | "profile.passwordDesc"
  | "profile.currentPassword"
  | "profile.newPassword"
  | "profile.confirmPassword"
  | "profile.changePassword"
  | "profile.updated"
  | "profile.failedUpdate"
  | "profile.changed"
  | "profile.failedChange"
  | "login.title"
  | "login.desc"
  | "login.username"
  | "login.password"
  | "login.welcome"
  | "login.invalid"
  | "form.longUrl"
  | "form.longUrlPlaceholder"
  | "form.algorithm"
  | "form.base62"
  | "form.base62Desc"
  | "form.xor"
  | "form.xorDesc"
  | "dialog.createTitle"
  | "dialog.createdTitle"
  | "redirect.notFound"
  | "redirect.notExist"
  | "redirect.redirecting"
  | "validation.usernameRequired"
  | "validation.passwordRequired"
  | "validation.nameMin"
  | "validation.emailValid"
  | "validation.currentPasswordRequired"
  | "validation.newPasswordMin"
  | "validation.passwordsMatch"
  | "validation.urlValid"
  | "validation.urlMax"
  | "title.copy"
  | "title.open"
  | "title.stats"
  | "title.edit"
  | "title.delete"
  | "toast.copiedClipboard"
  | "toast.copyFailed"
  | "toast.profileUpdated"
  | "toast.profileUpdateFailed"
  | "toast.passwordChanged"
  | "toast.passwordChangeFailed"
  | "toast.urlDeleted"
  | "urls.clicksCount"
  | "urls.colShortUrl"
  | "urls.colOriginalUrl"
  | "urls.colClicks"
  | "urls.colCreated"
  | "urls.selectedRows"
  | "urls.empty"
  | "dialog.deleteTitle"
  | "dialog.deleteDescription"
  | "urlForm.title"
  | "urlForm.description"
  | "urlForm.submit"
  | "urlStats.notFound"
  | "urlStats.details"
  | "urlStats.shortUrl"
  | "urlStats.originalUrl"
  | "urlStats.clicks"
  | "urlStats.qrCode"
  | "urlDetail.heading"
  | "urlEdit.heading"
  | "urlEdit.description"
  | "profile.save"
  | "profile.changePasswordTitle"
  | "profile.changePasswordDescription"
  | "profile.infoDescription"
  | "login.description"
  | "login.submit"
  | "error.network"
  | "error.unauthorized"
  | "error.forbidden"
  | "error.notFound"
  | "error.conflict"
  | "error.validation"
  | "error.server"
  | "error.unknown";

export type TranslationDict = Record<TranslationKey, string>;

export const en: TranslationDict = {
  "app.title": "ShortLink - URL Shortener",
  "app.description": "A modern URL shortening service",
  "nav.dashboard": "Dashboard",
  "nav.myUrls": "My URLs",
  "nav.documentation": "Documentation",
  "nav.github": "GitHub",
  "nav.resources": "Resources",
  "nav.profile": "Profile",
  "nav.logout": "Logout",
  "action.createUrl": "Create URL",
  "action.create": "Create",
  "action.edit": "Edit",
  "action.delete": "Delete",
  "action.cancel": "Cancel",
  "action.save": "Save changes",
  "action.copy": "Copy",
  "action.copied": "Copied",
  "action.open": "Open",
  "action.stats": "Stats",
  "action.search": "Search",
  "action.signIn": "Sign in",
  "action.firstPage": "First page",
  "action.prevPage": "Previous page",
  "action.nextPage": "Next page",
  "action.lastPage": "Last page",
  "aria.openMenu": "Open menu",
  "aria.closeMenu": "Close menu",
  "aria.collapseSidebar": "Collapse sidebar",
  "aria.expandSidebar": "Expand sidebar",
  "aria.userMenu": "User menu",
  "aria.selectLanguage": "Select language",
  "aria.toggleTheme": "Toggle theme",
  "aria.themeToLight": "Switch to light mode",
  "aria.themeToDark": "Switch to dark mode",
  "dashboard.heading": "Dashboard",
  "dashboard.totalUrls": "Total URLs",
  "dashboard.totalClicks": "Total Clicks",
  "dashboard.activeUrls": "Active URLs",
  "dashboard.recentUrls": "Recent URLs",
  "dashboard.noUrls": "No URLs yet",
  "dashboard.createFirstUrl": "Create your first URL",
  "urls.heading": "My URLs",
  "urls.searchPlaceholder": "Search by slug or URL...",
  "urls.noUrlsFound": "No URLs found",
  "urls.rowSelected": "of {count} row(s) selected.",
  "urls.results": "{count} result(s)",
  "urls.pageOf": "Page {page} of {total}",
  "table.shortUrl": "Short URL",
  "table.originalUrl": "Original URL",
  "table.clicks": "Clicks",
  "table.created": "Created",
  "table.actions": "Actions",
  "detail.heading": "URL Details",
  "detail.shortUrl": "Short URL",
  "detail.originalUrl": "Original URL",
  "detail.qrCode": "QR Code",
  "detail.notFound": "URL not found",
  "detail.copiedClipboard": "Copied to clipboard",
  "detail.failedCopy": "Failed to copy",
  "detail.updateDestination": "Update the destination URL",
  "detail.editSubtitle": "Update the destination for",
  "delete.title": "Delete URL?",
  "delete.description": "This will permanently delete",
  "delete.confirm": "Delete",
  "profile.heading": "Profile Settings",
  "profile.infoTitle": "Profile Information",
  "profile.infoDesc": "Update your name and email address",
  "profile.name": "Name",
  "profile.email": "Email",
  "profile.saveChanges": "Save changes",
  "profile.passwordTitle": "Change Password",
  "profile.passwordDesc": "Update your password",
  "profile.currentPassword": "Current Password",
  "profile.newPassword": "New Password",
  "profile.confirmPassword": "Confirm New Password",
  "profile.changePassword": "Change password",
  "profile.updated": "Profile updated",
  "profile.failedUpdate": "Failed to update profile",
  "profile.changed": "Password changed",
  "profile.failedChange": "Failed to change password",
  "login.title": "Sign in",
  "login.desc": "Use admin / admin to sign in",
  "login.username": "Username",
  "login.password": "Password",
  "login.welcome": "Welcome back!",
  "login.invalid": "Invalid credentials. Try admin / admin.",
  "form.longUrl": "Long URL",
  "form.longUrlPlaceholder": "https://example.com/very/long/url",
  "form.algorithm": "Algorithm",
  "form.base62": "Base62 Encoder",
  "form.base62Desc": "Timestamp + random counter encoded in Base62",
  "form.xor": "XOR Obfuscation",
  "form.xorDesc": "XOR-based obfuscation encoded in Base62",
  "dialog.createTitle": "Create Short URL",
  "dialog.createdTitle": "Short URL Created",
  "redirect.notFound": "URL Not Found",
  "redirect.notExist": "The short URL does not exist.",
  "redirect.redirecting": "Redirecting you...",
  "validation.usernameRequired": "Username is required",
  "validation.passwordRequired": "Password is required",
  "validation.nameMin": "Name must be at least 2 characters",
  "validation.emailValid": "Please enter a valid email address",
  "validation.currentPasswordRequired": "Current password is required",
  "validation.newPasswordMin": "New password must be at least 6 characters",
  "validation.passwordsMatch": "Passwords don't match",
  "validation.urlValid": "Please enter a valid URL",
  "validation.urlMax": "URL must not exceed 2048 characters",
  "profile.save": "Save changes",
  "profile.changePasswordTitle": "Change Password",
  "profile.changePasswordDescription": "Update your password",
  "profile.infoDescription": "Update your name and email address",
  "login.description": "Use admin / admin to sign in",
  "login.submit": "Sign in",
  "title.copy": "Copy",
  "title.open": "Open",
  "title.stats": "Stats",
  "title.edit": "Edit",
  "title.delete": "Delete",
  "toast.copiedClipboard": "Copied to clipboard",
  "toast.copyFailed": "Failed to copy",
  "toast.profileUpdated": "Profile updated",
  "toast.profileUpdateFailed": "Failed to update profile",
  "toast.passwordChanged": "Password changed",
  "toast.passwordChangeFailed": "Failed to change password",
  "toast.urlDeleted": "URL deleted",
  "urls.clicksCount": "{count} clicks",
  "urls.colShortUrl": "Short URL",
  "urls.colOriginalUrl": "Original URL",
  "urls.colClicks": "Clicks",
  "urls.colCreated": "Created",
  "urls.selectedRows": "{count} of {total} row(s) selected.",
  "urls.empty": "No URLs found",
  "dialog.deleteTitle": "Delete URL?",
  "dialog.deleteDescription": "This will permanently delete {slug} and all its stats.",
  "urlForm.title": "Edit URL",
  "urlForm.description": "Update the destination URL",
  "urlForm.submit": "Update URL",
  "urlStats.notFound": "URL not found",
  "urlStats.details": "URL Details",
  "urlStats.shortUrl": "Short URL",
  "urlStats.originalUrl": "Original URL",
  "urlStats.clicks": "clicks",
  "urlStats.qrCode": "QR Code",
  "urlDetail.heading": "URL Details",
  "urlEdit.heading": "Edit URL",
  "urlEdit.description": "Update the destination for {slug}",
  "error.network": "Unable to reach the server. Please check your connection and try again.",
  "error.unauthorized": "You are not authorized. Please sign in again.",
  "error.forbidden": "You do not have permission to perform this action.",
  "error.notFound": "The requested resource was not found.",
  "error.conflict": "This resource already exists or conflicts with another.",
  "error.validation": "Please check the entered information and try again.",
  "error.server": "Something went wrong on the server. Please try again later.",
  "error.unknown": "An unexpected error occurred. Please try again.",
};

export const fa: TranslationDict = {
  "app.title": "ShortLink - کوتاه‌کننده لینک",
  "app.description": "یک سرویس مدرن کوتاه‌کننده لینک",
  "nav.dashboard": "داشبورد",
  "nav.myUrls": "لینک‌های من",
  "nav.documentation": "مستندات",
  "nav.github": "گیت‌هاب",
  "nav.resources": "منابع",
  "nav.profile": "پروفایل",
  "nav.logout": "خروج",
  "action.createUrl": "ایجاد لینک",
  "action.create": "ایجاد",
  "action.edit": "ویرایش",
  "action.delete": "حذف",
  "action.cancel": "انصراف",
  "action.save": "ذخیره تغییرات",
  "action.copy": "کپی",
  "action.copied": "کپی شد",
  "action.open": "باز کردن",
  "action.stats": "آمار",
  "action.search": "جستجو",
  "action.signIn": "ورود",
  "action.firstPage": "صفحه اول",
  "action.prevPage": "صفحه قبلی",
  "action.nextPage": "صفحه بعدی",
  "action.lastPage": "صفحه آخر",
  "aria.openMenu": "باز کردن منو",
  "aria.closeMenu": "بستن منو",
  "aria.collapseSidebar": "جمع کردن نوار کناری",
  "aria.expandSidebar": "باز کردن نوار کناری",
  "aria.userMenu": "منوی کاربر",
  "aria.selectLanguage": "انتخاب زبان",
  "aria.toggleTheme": "تغییر تم",
  "aria.themeToLight": "تغییر به حالت روشن",
  "aria.themeToDark": "تغییر به حالت تاریک",
  "dashboard.heading": "داشبورد",
  "dashboard.totalUrls": "مجموع لینک‌ها",
  "dashboard.totalClicks": "مجموع کلیک‌ها",
  "dashboard.activeUrls": "لینک‌های فعال",
  "dashboard.recentUrls": "لینک‌های اخیر",
  "dashboard.noUrls": "هنوز لینکی وجود ندارد",
  "dashboard.createFirstUrl": "اولین لینک خود را ایجاد کنید",
  "urls.heading": "لینک‌های من",
  "urls.searchPlaceholder": "جستجو بر اساس نامک یا لینک...",
  "urls.noUrlsFound": "لینکی یافت نشد",
  "urls.rowSelected": "از {count} ردیف انتخاب شده.",
  "urls.results": "{count} نتیجه",
  "urls.pageOf": "صفحه {page} از {total}",
  "table.shortUrl": "لینک کوتاه",
  "table.originalUrl": "لینک اصلی",
  "table.clicks": "کلیک‌ها",
  "table.created": "ایجاد شده",
  "table.actions": "عملیات",
  "detail.heading": "جزئیات لینک",
  "detail.shortUrl": "لینک کوتاه",
  "detail.originalUrl": "لینک اصلی",
  "detail.qrCode": "کد QR",
  "detail.notFound": "لینک یافت نشد",
  "detail.copiedClipboard": "در کلیپ‌بورد کپی شد",
  "detail.failedCopy": "کپی ناموفق بود",
  "detail.updateDestination": "به‌روزرسانی لینک مقصد",
  "detail.editSubtitle": "به‌روزرسانی مقصد برای",
  "delete.title": "حذف لینک؟",
  "delete.description": "این عمل لینک و تمام آمار آن را برای همیشه حذف می‌کند",
  "delete.confirm": "حذف",
  "profile.heading": "تنظیمات پروفایل",
  "profile.infoTitle": "اطلاعات پروفایل",
  "profile.infoDesc": "نام و ایمیل خود را به‌روزرسانی کنید",
  "profile.name": "نام",
  "profile.email": "ایمیل",
  "profile.saveChanges": "ذخیره تغییرات",
  "profile.passwordTitle": "تغییر رمز عبور",
  "profile.passwordDesc": "رمز عبور خود را به‌روزرسانی کنید",
  "profile.currentPassword": "رمز عبور فعلی",
  "profile.newPassword": "رمز عبور جدید",
  "profile.confirmPassword": "تکرار رمز عبور جدید",
  "profile.changePassword": "تغییر رمز عبور",
  "profile.updated": "پروفایل به‌روزرسانی شد",
  "profile.failedUpdate": "به‌روزرسانی پروفایل ناموفق بود",
  "profile.changed": "رمز عبور تغییر کرد",
  "profile.failedChange": "تغییر رمز عبور ناموفق بود",
  "login.title": "ورود",
  "login.desc": "از admin / admin برای ورود استفاده کنید",
  "login.username": "نام کاربری",
  "login.password": "رمز عبور",
  "login.welcome": "خوش آمدید!",
  "login.invalid": "اطلاعات ورود نامعتبر است. admin / admin را امتحان کنید.",
  "form.longUrl": "لینک اصلی",
  "form.longUrlPlaceholder": "https://example.com/very/long/url",
  "form.algorithm": "الگوریتم",
  "form.base62": "Base62",
  "form.base62Desc": "زمان‌سنج + شمارنده تصادفی کدگذاری شده در Base62",
  "form.xor": "XOR",
  "form.xorDesc": "ابهام‌زدایی مبتنی بر XOR کدگذاری شده در Base62",
  "dialog.createTitle": "ایجاد لینک کوتاه",
  "dialog.createdTitle": "لینک کوتاه ایجاد شد",
  "redirect.notFound": "لینک یافت نشد",
  "redirect.notExist": "لینک کوتاه وجود ندارد.",
  "redirect.redirecting": "در حال هدایت شما...",
  "validation.usernameRequired": "نام کاربری الزامی است",
  "validation.passwordRequired": "رمز عبور الزامی است",
  "validation.nameMin": "نام باید حداقل ۲ کاراکتر باشد",
  "validation.emailValid": "لطفاً یک ایمیل معتبر وارد کنید",
  "validation.currentPasswordRequired": "رمز عبور فعلی الزامی است",
  "validation.newPasswordMin": "رمز عبور جدید باید حداقل ۶ کاراکتر باشد",
  "validation.passwordsMatch": "رمزهای عبور مطابقت ندارند",
  "validation.urlValid": "لطفاً یک لینک معتبر وارد کنید",
  "validation.urlMax": "لینک نباید بیش از ۲۰۴۸ کاراکتر باشد",
  "profile.save": "ذخیره تغییرات",
  "profile.changePasswordTitle": "تغییر رمز عبور",
  "profile.changePasswordDescription": "رمز عبور خود را به‌روزرسانی کنید",
  "profile.infoDescription": "نام و ایمیل خود را به‌روزرسانی کنید",
  "login.description": "از admin / admin برای ورود استفاده کنید",
  "login.submit": "ورود",
  "title.copy": "کپی",
  "title.open": "باز کردن",
  "title.stats": "آمار",
  "title.edit": "ویرایش",
  "title.delete": "حذف",
  "toast.copiedClipboard": "در کلیپ‌بورد کپی شد",
  "toast.copyFailed": "کپی ناموفق بود",
  "toast.profileUpdated": "پروفایل به‌روزرسانی شد",
  "toast.profileUpdateFailed": "به‌روزرسانی پروفایل ناموفق بود",
  "toast.passwordChanged": "رمز عبور تغییر کرد",
  "toast.passwordChangeFailed": "تغییر رمز عبور ناموفق بود",
  "toast.urlDeleted": "لینک حذف شد",
  "urls.clicksCount": "{count} کلیک",
  "urls.colShortUrl": "لینک کوتاه",
  "urls.colOriginalUrl": "لینک اصلی",
  "urls.colClicks": "کلیک‌ها",
  "urls.colCreated": "ایجاد شده",
  "urls.selectedRows": "{count} از {total} ردیف انتخاب شده.",
  "urls.empty": "لینکی یافت نشد",
  "dialog.deleteTitle": "حذف لینک؟",
  "dialog.deleteDescription": "این عمل لینک {slug} و تمام آمار آن را برای همیشه حذف می‌کند.",
  "urlForm.title": "ویرایش لینک",
  "urlForm.description": "به‌روزرسانی لینک مقصد",
  "urlForm.submit": "به‌روزرسانی لینک",
  "urlStats.notFound": "لینک یافت نشد",
  "urlStats.details": "جزئیات لینک",
  "urlStats.shortUrl": "لینک کوتاه",
  "urlStats.originalUrl": "لینک اصلی",
  "urlStats.clicks": "کلیک",
  "urlStats.qrCode": "کد QR",
  "urlDetail.heading": "جزئیات لینک",
  "urlEdit.heading": "ویرایش لینک",
  "urlEdit.description": "به‌روزرسانی مقصد برای {slug}",
  "error.network": "اتصال به سرور امکان‌پذیر نیست. لطفاً اتصال خود را بررسی و دوباره تلاش کنید.",
  "error.unauthorized": "دسترسی غیرمجاز است. لطفاً دوباره وارد شوید.",
  "error.forbidden": "شما اجازه انجام این عمل را ندارید.",
  "error.notFound": "منبع درخواستی یافت نشد.",
  "error.conflict": "این منبع قبلاً وجود دارد یا با مورد دیگری تداخل دارد.",
  "error.validation": "لطفاً اطلاعات وارد شده را بررسی و دوباره تلاش کنید.",
  "error.server": "خطایی در سرور رخ داد. لطفاً بعداً تلاش کنید.",
  "error.unknown": "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.",
};
