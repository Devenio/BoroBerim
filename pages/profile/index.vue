<template>
  <div>
    <main ref="main" class="main" :class="[vuexMenuState ? 'blur' : '',vuexLogregMobileState ? 'blur' : '']" @click="closeMenu">
      <div class="user-profile-title">
        <div class="mobile-icon">
          <a href="javascript:void(0)" @click="openProfileMenu">
            <img src="/images/burger.svg" alt="">
          </a>
        </div>
        <div class="inner-title">
          <div>
            <div class="img">
              <img :src="profile.image" :alt="profile.name">
            </div>
            <div class="name-mobile">
              <p class="name">{{ profile.name }}</p>
              <span class="mobile">{{ profile.mobile }}</span>
              <p class="deposit">
                <span>موجودی : </span>
                <span>{{ number_3_3(profile.wallet) }} تومان</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section class="profile">
        <aside class="sidebar" :class="[vuexProfileMenuState ? 'active' : '']">
          <div class="top" v-if="profile.level === 3">
            <ul>
              <li>
                <nuxt-link to="/">
                  <i class="bx bx-home"></i>
                  خانه
                </nuxt-link>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(0)" :class="[panel === 0 ? 'active' : '']">
                  <i class="bx bx-chart"></i>
                  داشبورد
                </a>
              </li>
              <li>
                <nuxt-link to="/profile/reserves">
                  <i class="bx bx-git-pull-request"></i>
                  لیست رزروها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/residences">
                  <i class="bx bx-building-house"></i>
                  مدیریت اقامتگاه‌ها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/comments">
                  <i class="bx bx-chat"></i>
                  نظرات کاربران
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/complains">
                  <i class="bx bx-chat"></i>
                  شکایات کاربران
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="bottom">
            <ul>
              <li>
                <nuxt-link to="/checkOut">
                  <i class="bx bx-shopping-bag"></i>
                  سفرهای من
                </nuxt-link>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(1)" :class="[panel === 1 ? 'active' : '']">
                  <i class="bx bx-user-check"></i>
                  ویرایش مشخصات
                </a>
              </li>
              <li>
                <nuxt-link to="/profile/residence/new">
                  <i class="bx bx-star"></i>
                  ثبت اقامتگاه
                </nuxt-link>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(2)" :class="[panel === 2 ? 'active' : '']">
                  <i class="bx bx-heart"></i>
                  علاقه مندی‌ها
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(10)" :class="[panel === 10 ? 'active' : '']">
                  <i class="bx bx-wallet"></i>
                  بازاریابی
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(4)" :class="[panel === 4 ? 'active' : '']">
                  <i class="bx bx-wallet"></i>
                  کیف پول و تراکنش‌ها
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(5)" :class="[panel === 5 ? 'active' : '']">
                  <i class="bx bx-credit-card"></i>
                  تسویه حساب
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(6)" :class="[panel === 6 ? 'active' : '']">
                  <i class="bx bx-error"></i>
                  شکایت‌ها
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(7)" :class="[panel === 7 ? 'active' : '']">
                  <i class="bx bx-headphone"></i>
                  پشتیبانی
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="changePanel(9)" :class="[panel === 9 ? 'active' : '']">
                  <i class="bx bx-credit-card"></i>
                  کارت‌های بانکی
                </a>
              </li>
            </ul>
          </div>
          <div class="logout">
            <a href="javascript:void(0)" @click="logout">
              <i class="bx bx-log-out-circle"></i>
              خروج از حساب کاربری
            </a>
          </div>
        </aside>

        <div ref="dashboard" class="body dashboard" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 0">
          <div class="charts">
            <div class="request">
              <h3>
                <i class="bx bx-mail-send"></i>
                درخواست‌های رزرو
              </h3>
              <div>
                <p>
                  <span>{{ profile.allReserves }}</span>
                  <span class="text"><i class="bx bxs-circle"></i>کل</span>
                </p>
                <p>
                  <span>{{ profile.acceptedReserves }}%</span>
                  <span class="text"><i class="bx bxs-circle"></i>درصد تایید</span>
                </p>
              </div>
            </div>
            <div class="submitted">
              <h3><i class="bx bxs-message-dots"></i>اقامتگاه‌های ثبت شده</h3><p>{{ profile.residences }}</p>
            </div>
            <div class="score">
              <h3>
                <i class="bx bx-bowling-ball"></i>
                امتیاز شما
              </h3>
              <p>
                <span>{{ profile.score }}</span>
              </p>
            </div>
            <div class="upset">
              <h3>
                <i class="bx bxs-confused"></i>
                شکایت از شما
              </h3>
              <p>{{ profile.complainsCount }}</p>
            </div>
          </div>
          <div class="requests-comments">
            <div class="requests">
              <div class="title">
                <h3>
                  <i class="bx bx-mail-send"></i>
                  آخرین درخواست‌ها
                </h3>
                <nuxt-link to="/profile/reserves">
                  <i class="bx bx-list-plus"></i>
                  نمایش همه
                </nuxt-link>
              </div>
              <table class="request-list uk-table uk-table-middle">
                <thead>
                <tr>
                  <th>عنوان آگهی</th>
                  <th>کاربر</th>
                  <th>تاریخ</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="newOrder in profile.newOrders">
                  <td class="name">
                    <p>{{ newOrder.residence }}</p>
                  </td>
                  <td class="user-info">
                    <span>{{ newOrder.user }}</span>
                  </td>
                  <td class="date">
                    {{ newOrder.date }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="comments">
              <div class="title">
                <h3>
                  <i class="bx bx-chat"></i>
                  تازه ترین نظرات کاربران
                </h3>
                <nuxt-link to="/profile/comments">
                  <i class="bx bx-list-plus"></i>
                  نمایش همه
                </nuxt-link>
              </div>
              <div class="items">
                <div class="item" v-for="newComment in profile.newComments">
                  <div class="name-img-date">
                    <div class="name-img">
                      <p>{{ newComment.user }}</p>
                    </div>
                    <div class="date">
                      <span>{{ newComment.date }}</span>
                    </div>
                  </div>
                  <div class="text">
                    <p v-html="newComment.text"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref="dashboard" class="body edit-user-info" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 1">
          <form>
            <div class="right">
              <div class="img">
                <img :src="profile.image" :alt="profile.name">
                <div class="js-upload change-photo" uk-form-custom>
                  <input type="file" @change="uploadImage" ref="userImageInput" style="display: none">
                  <button class="uk-button uk-button-default" type="button" tabindex="-1" @click="$refs.userImageInput.click()">
                      <span>
                          <i class="bx bx-camera"></i>
                      </span>
                  </button>
                </div>
              </div>
              <div class="submit">
                <button v-if="updatingProfile === false" @click="updateProfile">ثبت و ذخیره</button>
                <button v-else>صبر کنید</button>
              </div>
            </div>
            <div class="left">
              <div class="row uk-margin-top">
                <div class="form-group w-50">
                  <input type="text" id="name" v-model="userForm.name" required>
                  <span class="floating-label">نام</span>
                </div>
                <div class="form-group w-50">
                  <input type="text" id="email" v-model="userForm.email" required>
                  <span class="floating-label">ایمیل</span>
                </div>
              </div>
              <div class="row">
                <h6 class="form-group w-100">در صورت نیاز گذرواژه خود را تغییر دهید :<br></h6>
              </div>
              <div class="row">
                <div class="form-group w-30">
                  <input type="password" id="oldPassword" v-model="userForm.oldPassword" required>
                  <span class="floating-label">گذرواژه قدیمی</span>
                </div>
                <div class="form-group w-30">
                  <input type="password" id="newPassword" v-model="userForm.newPassword" required>
                  <span class="floating-label">گذرواژه جدید</span>
                </div>
                <div class="form-group w-30">
                  <input type="password" id="newRePassword" v-model="userForm.newRePassword" required>
                  <span class="floating-label">تایپ مجدد گذرواژه جدید</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div ref="dashboard" class="body reserve-list favorite" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 2">
          <h1 class="profile-title"><i class="bx bx-heart"></i>علاقه مندی‌ها</h1>
          <div class="total-places">
            <ul class="items">
              <ResidenceIndex v-for="favorite in this.profile.favorites" :key="favorite.id" :residence="favorite" />
            </ul>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 4">
          <h1 class="profile-title">شارژ کیف پول</h1>
          <div class="form">
            <form action="">
              <div class="row">
                <div class="form-group w-50">
                  <input type="text" id="amount" v-model="amount" required>
                  <span class="floating-label">مبلغ</span>
                  <span class="error" v-if="errors.amount">{{ errors.amount[0] }}</span>
                </div>
                <div class="submit-cancel w-50">
                  <a href="javascript:void(0)" class="submit" @click="charge" v-if="charging === false">
                    <i class="bx bx-chevron-right"></i>
                    شارژ کن
                  </a>
                  <a href="javascript:void(0)" class="submit" v-else>
                    <i class="bx bx-chevron-right"></i>
                    چند لحظه صبر کنید
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>#</th>
                  <th>مبلغ</th>
                  <th>وضعیت</th>
                  <th>نوع تراکنش</th>
                  <th>نوع پرداخت</th>
                  <th>تاریخ</th>
                  <th>جزئیات</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="transaction in this.profile.transactions">
                  <td>{{ transaction.id }}</td>
                  <td>{{ number_3_3(transaction.amount) }}</td>
                  <td>
                    <span class="uk-text-primary" v-if="transaction.status === 0">اتصال به درگاه</span>
                    <span class="uk-text-success" v-else-if="transaction.status === 1">پرداخت موفق</span>
                    <span class="uk-text-warning" v-else-if="transaction.status === 2">کنسل شده</span>
                    <span class="uk-text-danger" v-else>خطا در پرداخت</span>
                  </td>
                  <td>
                    <span class="uk-text-warning" v-if="transaction.type === 1">پرداخت</span>
                    <span class="uk-text-success" v-else>برداشت</span>
                  </td>
                  <td>
                    <span class="uk-text-warning" v-if="transaction.payType === 1">آنلاین</span>
                    <span class="uk-text-success" v-else>کیف پول</span>
                  </td>
                  <td>{{ transaction.date }}</td>
                  <td><button type="button" class="uk-button uk-button-primary" @click="showTransaction(transaction)">نمایش</button></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 5">
          <h1 class="profile-title" style="float: right;">تسویه حساب</h1>
          <p class="walletAmount">
            <span>موجودی : </span>
            <span>{{ number_3_3(profile.wallet) }} تومان</span>
          </p>
          <div class="form" style="clear: both; margin-top: 50px;">
            <form action="">
              <div class="row">
                <div class="form-group w-25">
                  <input type="text" id="amountPurify" v-model="purifyForm.amountPurify" required>
                  <span class="floating-label">مبلغ</span>
                  <span class="error" v-if="errors.amountPurify">{{ errors.amountPurify[0] }}</span>
                </div>
                <div class="form-group w-50">
                  <no-ssr>
                    <v-select :options="profile.userCards" :reduce="userCard => userCard.id" placeholder="کارت بانکی"
                              id="userCard" v-model="purifyForm.userCard"></v-select>
                  </no-ssr>
                  <span v-if="errors.userCard" class="error">{{ errors.userCard[0] }}</span>
                </div>
                <div class="form-group w-25">
                  <input type="text" id="userMessage" v-model="purifyForm.userMessage" required>
                  <span class="floating-label">پیام شما</span>
                  <span class="error" v-if="errors.userMessage">{{ errors.userMessage[0] }}</span>
                </div>
                <div class="submit-cancel w-100">
                  <button type="button" class="submit" @click="sendPurify" v-if="sendingPurify === false">
                    <i class="bx bx-chevron-right"></i>
                    ثبت درخواست
                  </button>
                  <button type="button" class="submit" v-else>
                    <i class="bx bx-chevron-right"></i>
                    چند لحظه صبر کنید
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>#</th>
                  <th>مبلغ</th>
                  <th>وضعیت</th>
                  <th>کد پیگیری</th>
                  <th>تاریخ</th>
                  <th>پیام شما/مدیریت</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="purify in this.profile.purifies">
                  <td>{{ purify.id }}</td>
                  <td>{{ number_3_3(purify.amount) }}</td>
                  <td>
                    <span class="uk-text-primary" v-if="purify.status === 1">درخواست جدید</span>
                    <span class="uk-text-warning" v-else-if="purify.status === 2">در دست بررسی</span>
                    <span class="uk-text-danger" v-else-if="purify.status === 3">رد شده</span>
                    <span class="uk-text-success" v-else>قبول درخواست</span>
                  </td>
                  <td>{{ purify.trackingCode }}</td>
                  <td>{{ purify.date }}</td>
                  <td>
                    <a href="javascript:void(0)" class="uk-button uk-button-small uk-button-primary" @click="showPurify(purify.userMessage,purify.adminMessage)">نمایش</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 6">
          <h1 class="profile-title">شکایت‌ها</h1>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>#</th>
                  <th>موضوع</th>
                  <th>وضعیت</th>
                  <th>تاریخ</th>
                  <th>متن شکایت</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="complain in this.profile.complains">
                  <td>{{ complain.id }}</td>
                  <td>{{complain.subject }}</td>
                  <td>
                    <span class="uk-text-primary" v-if="complain.status === 1">درخواست جدید</span>
                    <span class="uk-text-warning" v-else-if="complain.status === 2">در دست بررسی</span>
                    <span class="uk-text-danger" v-else-if="complain.status === 3">رد شده</span>
                    <span class="uk-text-success" v-else-if="complain.status === 4">قبول شکایت</span>
                    <span class="uk-text-info" v-else>حل مشکل</span>
                  </td>
                  <td>{{ complain.date }}</td>
                  <td>
                    <a href="javascript:void(0)" class="uk-button uk-button-small uk-button-primary" @click="showComplain(complain.text)">نمایش</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 7">
          <h1 class="profile-title">پشتیبانی</h1>
          <div class="form">
            <form action="" class="form-flex-start">
              <div class="row">
                <div class="form-group w-100">
                  <label for="subject">عنوان تیکت</label>
                  <input type="text" id="subject" v-model="ticketForm.subject">
                  <span v-if="errors.subject" class="error">{{ errors.subject[0] }}</span>
                </div>
              </div>
              <div class="row">
                <div class="form-group w-100">
                  <textarea id="text" v-model="ticketForm.text" style="line-height: 30px; height: 100px;" required></textarea>
                  <span class="floating-label">توضیح</span>
                  <span v-if="errors.text" class="error">{{ errors.text[0] }}</span>
                </div>
              </div>
              <div class="row submit-cancel">
                <button type="button" class="submit" @click="sendTicket" v-if="sendingTicket === false">
                  <i class="bx bx-chevron-right"></i>
                  ثبت درخواست
                </button>
                <button type="button" class="submit" v-else>
                  <i class="bx bx-chevron-right"></i>
                  چند لحظه صبر کنید
                </button>
              </div>
            </form>
          </div>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>#</th>
                  <th>موضوع</th>
                  <th>وضعیت</th>
                  <th>تاریخ</th>
                  <th>عملیات</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ticket in profile.tickets">
                  <td class="date">{{ ticket.id }}</td>
                  <td class="date">
                    {{ ticket.subject }}
                  </td>
                  <td class="status">
                    <span class="uk-label uk-label-warning" v-if="ticket.status === 1">تیکت جدید</span>
                    <span class="uk-label uk-label-danger" v-if="ticket.status === 2">در دست بررسی</span>
                    <span class="uk-label uk-label-warning" v-if="ticket.status === 3">پاسخ شما</span>
                    <span class="uk-label uk-label-danger" v-if="ticket.status === 4">پاسخ داده شده</span>
                    <span class="uk-label uk-label-success" v-if="ticket.status === 5">بسته</span>
                  </td>
                  <td class="date">
                    {{ ticket.date }}
                  </td>
                  <td class="see-close">
                    <a href="javascript:void(0)" @click="closeTicket(ticket.id)" class="uk-button uk-button-danger uk-button-small">بستن</a>
                    <a href="javascript:void(0)" @click="showTicket(ticket.id)" class="uk-button uk-button-primary uk-button-small">نمایش</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 8">
          <h1 class="profile-title">نمایش تیکت</h1>
          <div class="all-messages">
            <div>
              <div class="title">
                <div>
                  <img :src="ticket.image" alt="">
                  <p>
                    <span>{{ ticket.user }}</span>
                    <span class="uk-text-warning" v-if="ticket.status === 1">تیکت جدید</span>
                    <span class="uk-text-danger" v-if="ticket.status === 2">در دست بررسی</span>
                    <span class="uk-text-warning" v-if="ticket.status === 3">پاسخ شما</span>
                    <span class="uk-text-danger" v-if="ticket.status === 4">پاسخ داده شده</span>
                    <span class="uk-text-success" v-if="ticket.status === 5">بسته</span>
                  </p>
                </div>
                <p class="date">{{ ticket.date }}</p>
              </div>
              <div class="text" v-html="ticket.text"></div>
            </div>
            <div v-for="child in ticket.childs">
              <div class="title">
                <div>
                  <img :src="child.image" alt="">
                  <p>
                    <span>{{ child.user }}</span>
                    <span v-if="child.who === 1">شما</span>
                    <span v-else>مدیر</span>
                  </p>
                </div>
                <p class="date">{{ child.date }}</p>
              </div>
              <div class="text" v-html="child.text"></div>
            </div>
          </div>
          <div class="send-message">
            <form action="">
              <div class="row">
                <div class="form-group w-100">
                  <textarea id="answer" v-model="answer" style="line-height: 30px; height: 100px;" required></textarea>
                  <span class="floating-label">پیام جدید</span>
                  <span v-if="errors.answer" class="error">{{ errors.answer[0] }}</span>
                </div>
                <div class="submit-cancel w-25">
                  <button type="button" class="submit" v-if="sendingAnswer === false" @click="answerTicket">
                    <i class="bx bx-chevron-right"></i>
                    ارسال
                  </button>
                  <button type="button" class="submit" v-else>
                    <i class="bx bx-chevron-right"></i>
                    چند لحظه صبر کنید
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 9">
          <h1 class="profile-title">کارت‌های بانکی</h1>
          <div class="form">
            <form action="" class="form-flex-start">
              <div class="row">
                <div class="form-group w-50">
                  <input type="text" id="bank" v-model="cardForm.bank" required>
                  <span class="floating-label">بانک صادر کننده</span>
                  <span v-if="errors.bank" class="error">{{ errors.bank[0] }}</span>
                </div>
                <div class="form-group w-50">
                  <input type="text" id="bname" v-model="cardForm.name" required>
                  <span class="floating-label">نام دارنده حساب</span>
                  <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
                </div>
              </div>
              <div class="row">
                <div class="form-group w-50">
                  <input type="text" id="cardNumber" v-model="cardForm.cardNumber" required>
                  <span class="floating-label">شماره کارت</span>
                  <span v-if="errors.cardNumber" class="error">{{ errors.cardNumber[0] }}</span>
                </div>
                <div class="form-group w-50">
                  <input type="text" id="shaba" v-model="cardForm.shaba" required>
                  <span class="floating-label">شماره شبا</span>
                  <span v-if="errors.shaba" class="error">{{ errors.shaba[0] }}</span>
                </div>
              </div>
              <div class="row submit-cancel">
                <button type="button" class="submit" @click="saveCard" v-if="savingCard === false">
                  <i class="bx bx-chevron-right"></i>
                  ثبت کارت جدید
                </button>
                <button type="button" class="submit" v-else>
                  <i class="bx bx-chevron-right"></i>
                  چند لحظه صبر کنید
                </button>
              </div>
            </form>
          </div>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>#</th>
                  <th>بانک صادر کننده</th>
                  <th>نام دارنده حساب</th>
                  <th>شماره کارت</th>
                  <th>شماره شبا</th>
                  <th>وضعیت</th>
                  <th>تاریخ ثبت</th>
                  <th>حذف</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="card in profile.cards">
                  <td class="date">{{ card.id }}</td>
                  <td class="date">{{ card.bank }}</td>
                  <td class="date">{{ card.name }}</td>
                  <td class="date">{{ card.cardNumber }}</td>
                  <td class="date">{{ card.shaba }}</td>
                  <td class="status">
                    <span class="uk-text-success" v-if="card.status === 1">تأیید شده</span>
                    <span class="uk-text-danger" v-else-if="card.status === 2">رد شده</span>
                    <span class="uk-text-warning" v-else>در دست بررسی</span>
                  </td>
                  <td class="date">{{ card.date }}</td>
                  <td class="see-close">
                    <a href="javascript:void(0)" @click="deleteCard(card.id)" v-if="deletingCard === false"
                       class="uk-button uk-button-danger uk-button-small">حذف</a>
                    <a href="javascript:void(0)" v-else
                       class="uk-button uk-button-danger uk-button-small">حذف</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div ref="dashboard" class="body reserve-list finance" @click="closeProfileMenu"
             :class="[vuexProfileMenuState ? 'blur' : '']" v-if="panel === 10">
          <h1 class="profile-title">کد معرف : {{ profile.affiliateCode }}</h1>
          <a href="javascript:void(0)" @click="copyAffUrl">لینک بازاریابی (کلیک کنید)</a>
          <br><hr><br>
          <h4>کاربران زیر مجموعه</h4>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>شماره کاربر</th>
                  <th>نام کاربر</th>
                  <th>تعداد سفارشات</th>
                  <th>مبلغ سفارشات</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="subUser in this.profile.subUsers">
                  <td>{{ subUser.id }}</td>
                  <td>{{ subUser.name }}</td>
                  <td>{{ subUser.ordersCount }}</td>
                  <td>{{ number_3_3(subUser.ordersAmount) }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br><hr><br>
          <h4>سفارش های کاربران زیر مجموعه</h4>
          <div class="show-lists">
            <div class="uk-overflow-auto">
              <table class="uk-table uk-table-middle ">
                <thead>
                <tr>
                  <th>شماره سفارش</th>
                  <th>نام کاربر</th>
                  <th>مبلغ واریزی</th>
                  <th>شروع اقامت</th>
                  <th>پایان اقامت</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="subUserOrder in this.profile.subUserOrders">
                  <td>{{ subUserOrder.id }}</td>
                  <td>{{ subUserOrder.user }}</td>
                  <td>{{ number_3_3(subUserOrder.amount) }}</td>
                  <td>{{ subUserOrder.startDate }}</td>
                  <td>{{ subUserOrder.endDate }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
    <vk-modal id="purifyModal" :show.sync="purifyModal">
      <h5 class="uk-modal-title">پیام شما/مدیریت</h5>
      <br><br>
      <p><b>پیام شما :</b> {{ userMessage }}</p>
      <br><br>
      <p><b>پیام مدیریت :</b> {{ adminMessage }}</p>
      <br><br>
      <p class="uk-text-right">
        <button type="button" class="uk-button uk-button-default uk-modal-close" @click="purifyModal = false">بستن</button>
      </p>
    </vk-modal>
    <vk-modal id="complainModal" :show.sync="complainModal">
      <h5 class="uk-modal-title">متن شکایت</h5>
      <br><br>
      <p>{{ complainText }}</p>
      <br><br>
      <p class="uk-text-right">
        <button type="button" class="uk-button uk-button-default uk-modal-close" @click="complainModal = false">بستن</button>
      </p>
    </vk-modal>
    <vk-modal id="transactionModal" :show.sync="transactionModal">
      <h4 v-show="transaction.trackingCode">کد رهگیری : {{ transaction.trackingCode }}</h4>
      <br><br>
      <p>{{ transaction.systemMessage }}</p>
      <br><br>
      <p class="uk-text-right">
        <button type="button" class="uk-button uk-button-default uk-modal-close" @click="transactionModal = false">بستن</button>
      </p>
    </vk-modal>
  </div>
</template>

<style src="~/assets/styles/css/newResidence2.css" scoped />

<script>
  import ResidenceIndex from "~/components/ResidenceIndex";
  import { mapGetters } from 'vuex';

  export default {
    layout: 'profile',
    components: {
      ResidenceIndex
    },
    data() {
      return {
        url: 'http://localhost:8000',
        bbrurl: 'http://localhost:3000',
        amount: null,
        panel: 1,
        profile: [],
        charging: false,
        sendingPurify: false,
        sendingTicket: false,
        updatingProfile: false,
        userForm: {
          name: null,
          email: null,
          oldPassword: null,
          newPassword: null,
          newRePassword: null
        },
        purifyForm: {
          userCard: null,
          amountPurify: null,
          userMessage: null
        },
        ticketForm: {
          subject: null,
          text: null
        },
        cardForm: {
          bank: null,
          name: null,
          cardNumber: null,
          shaba: null
        },
        userMessage: null,
        adminMessage: null,
        complainText: null,
        ticketId: 0,
        answer: null,
        ticket: [],
        transaction: {
          trackingCode: null,
          systemMessage: null
        },
        sendingAnswer: false,
        savingCard: false,
        purifyModal: false,
        complainModal: false,
        transactionModal: false,
        deletingCard: false,
        errors: []
      }
    },
    async asyncData({$auth,$axios,route,redirect}) {
      if(!$auth.loggedIn)
        redirect('/');

      const { data } = await $axios.get('api/v1/user/profile');
      let panel = 1;
      if(data.profile.residences !== 0)
        panel = 0;
      if(route.query.panel)
        panel = parseInt(route.query.panel);
      return {
        panel: panel,
        profile: data.profile,
        userForm: {name: data.profile.name,email: data.profile.email}
      };
    },
    methods: {
      changePanel(number) {
        this.panel = number;
        this.$store.dispatch('setVuexMenuState',false);
        this.$store.dispatch('setVuexProfileMenuState',false);
      },
      showPurify(userMessage,adminMessage) {
        this.userMessage = userMessage;
        this.adminMessage = adminMessage;
        this.purifyModal = true;
      },
      showComplain(complainText) {
        this.complainText = complainText;
        this.complainModal = true;
      },
      copyAffUrl() {
        this.copyUrl(this.bbrurl+'/aff/'+this.profile.affiliateCode);
        this.$snotify.success('کد معرف کپی شد . آن را با دیگران به اشتراک بگذارید', {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      },
      copyUrl(myUrl) {
        const el = document.createElement('textarea');
        el.value = myUrl;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
        }
      },
      async updateProfile() {
        this.updatingProfile = true;
        if(this.userForm.newPassword !== this.userForm.newRePassword) {
          this.$snotify.error('گذرواژه با تایپ مجدد آن خوانایی ندارد', {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          return;
        }
        this.errors = [];
        let res = await this.$axios.post('api/v1/user/updateProfile',this.userForm);
        if (res.data.status === 1) {
          this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else if (res.data.status === 422) {
          this.errors = res.data.errors;
          this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.updatingProfile = false;
      },
      async charge() {
        this.charging = true;
        this.errors = [];
        let charge = await this.$axios.post('api/v1/user/charge',{'amount':this.amount});
        if(charge.data.status === 1) {
          this.$snotify.success(charge.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          window.location.href = this.url+"/charge/"+charge.data.id;
        } else if(charge.data.status === 422) {
          this.errors = charge.data.errors;
          this.$snotify.warning(charge.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(charge.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.charging = false;
      },
      showTransaction(transaction) {
        this.transaction = {
          trackingCode: transaction.trackingCode,
          systemMessage: transaction.systemMessage
        };
        this.transactionModal = true;
      },
      async sendPurify() {
        this.sendingPurify = true;
        this.errors = [];
        let sendPurify = await this.$axios.post('api/v1/user/sendPurify',this.purifyForm);
        if(sendPurify.data.status === 1) {
          this.$snotify.success(sendPurify.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.purifyForm = {
            amountPurify : null,
            userMessage : null
          };
          const profile = await this.$axios.get('api/v1/user/profile');
          this.profile = profile.data.profile;
        } else if(sendPurify.data.status === 422) {
          this.errors = sendPurify.data.errors;
          this.$snotify.warning(sendPurify.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(sendPurify.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.sendingPurify = false;
      },
      uploadImage(e) {
        const fd = new FormData();
        fd.append('image',e.target.files[0]);
        this.$axios.post('api/v1/user/uploadImage',fd)
          .then(res=>{
            if(res.data.status === 1) {
              this.$snotify.success('تصویر با موفقیت آپلود شد', {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
              this.$router.go();
            }else {
              this.$snotify.error('خطا در ذخیره تصویر', {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
            }
          });
      },
      async sendTicket() {
        this.sendingTicket = true;
        this.errors = [];
        let sendTicket = await this.$axios.post('api/v1/user/sendTicket',this.ticketForm);
        if(sendTicket.data.status === 1) {
          this.$snotify.success(sendTicket.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.ticketForm = {
            subject: null,
            text: null
          };
          const profile = await this.$axios.get('api/v1/user/profile');
          this.profile = profile.data.profile;
        } else if(sendTicket.data.status === 422) {
          this.errors = sendTicket.data.errors;
          this.$snotify.warning(sendTicket.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(sendTicket.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.sendingTicket = false;
      },
      async showTicket(id) {
        this.ticketId = id;
        this.errors = [];
        let res = await this.$axios.post('api/v1/user/showTicket',{'id':this.ticketId});
        if (res.data.status === 1) {
          this.ticket = res.data.ticket;
        } else if (res.data.status === 422) {
          this.errors = res.data.errors;
          this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.panel = 8;
      },
      async answerTicket() {
        this.sendingAnswer = true;
        this.errors = [];
        let res = await this.$axios.post('api/v1/user/answerTicket',{'id':this.ticketId,'answer':this.answer});
        if (res.data.status === 1) {
          this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.answer = null;
          let res2 = await this.$axios.post('api/v1/user/showTicket',{'id':this.ticketId});
          if (res2.data.status === 1)
            this.ticket = res2.data.ticket;
        } else if (res.data.status === 422) {
          this.errors = res.data.errors;
          this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.sendingAnswer = false;
      },
      async closeTicket(id) {
        this.ticketId = id;
        this.errors = [];
        let res = await this.$axios.post('api/v1/user/closeTicket',{'id':this.ticketId});
        if (res.data.status === 1) {
          this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          const profile = await this.$axios.get('api/v1/user/profile');
          this.profile = profile.data.profile;
        } else if (res.data.status === 422) {
          this.errors = res.data.errors;
          this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
      },
      async saveCard() {
        this.savingCard = true;
        this.errors = [];
        let res = await this.$axios.post('api/v1/user/saveCard',this.cardForm);
        if (res.data.status === 1) {
          this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          const profile = await this.$axios.get('api/v1/user/profile');
          this.profile = profile.data.profile;
          this.cardForm = {
            bank: null,
            name: null,
            cardNumber: null,
            shaba: null
          };
        } else if (res.data.status === 422) {
          this.errors = res.data.errors;
          this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.savingCard = false;
      },
      async deleteCard(id) {
        if(this.deletingCard === false) {
          this.deletingCard = true;
          this.errors = [];
          let res = await this.$axios.post('api/v1/user/deleteCard',{'id':id});
          if (res.data.status === 1) {
            this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
            const profile = await this.$axios.get('api/v1/user/profile');
            this.profile = profile.data.profile;
          } else if (res.data.status === 422) {
            this.errors = res.data.errors;
            this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          } else {
            this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          }
        }
        this.deletingCard = false;
      },
      logout() {
        this.$auth.logout();
        this.$router.push('/');
      },
      openProfileMenu() {
        if(this.vuexProfileMenuState === true) {
          this.$store.dispatch('setVuexProfileMenuState',false);
        } else {
          this.$store.dispatch('setVuexProfileMenuState',true);
        }
      },
      closeProfileMenu() {
        const dashboard = this.$refs.dashboard;
        if (dashboard.classList.contains('blur'))
          this.$store.dispatch('setVuexProfileMenuState',false);
      },
      closeMenu() {
        const main = this.$refs.main;
        if (main.classList.contains('blur')) {
          this.$store.dispatch('setVuexMenuState',false);
          this.$store.dispatch('setVuexLogregMobileState',false);
        }
      },
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num;
        const separator = typeof sep === 'undefined' ? ',' : sep;
        if(typeof number !== 'undefined')
          return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
      }
    },
    computed: {
      vuexProfileMenuState() {
        return this.$store.getters.vuexProfileMenuState
      },
      vuexMenuState() {
        return this.$store.getters.vuexMenuState
      },
      vuexLogregMobileState() {
        return this.$store.getters.vuexLogregMobileState
      },
      ...mapGetters(['settings'])
    },
    created() {
      this.$store.dispatch('setVuexMenuState',false);
      this.$store.dispatch('setVuexProfileMenuState',false);
    },
    head() {
      return {
        title: 'حساب کاربری - '+this.settings.sitename,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.settings.sitedesc
          },
        ],
      }
    }
  }
</script>
