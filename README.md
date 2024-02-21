

Proje, Vue3 ile geliştirilmiş bir ön uç uygulamasıdır (vuex, vue router ile). Bir Yazar Kasa uygulamasıdır.

# İçinde Admin ve kullanıcı yetkilendirmeleri bulunmaktadır.

# Ürün kısmında: Ürün ekleme, düzenleme, silme, kategorilendirme ve listeleme sistemi mevcuttur. Ürüne birden fazla fiyat eklenebilir ve prim performans sistemi belirlenebilir (Personel seçimi için).

# Müşteri kısmında: Müşteri ekleme, silme, geçmiş siparişler ve paket-seans kalanını görme ve düzenleme özellikleri bulunmaktadır. Ayrıca, müşterinin kasadan tekrar alışverişe dönmesi durumlarında Beklet-Çağır özelliği bulunmaktadır (Mevcut sepeti ve ödemeleri askıya alır ve daha sonra tekrar çağrılabilir).
# Personel kısmında: Personel başvuru gerçekleştirdiğinde, admin onayı ile sisteme katılabilir. Personel performans ve primine ilişkin detaylar görüntülenebilir (bu kısım tam sonlanmadı). Ayrıca, ürün-hizmet satışlarında varsa prim ve performans için personel seçilebilir.
# Raporlama kısmında: Seçilen tarih aralığında istatistikler görüntülenebilir (bu kısım biraz eksik ve zamanla geliştirilebilir).
# Teknik açıdan dinamik bir modal bileşeni bulunmaktadır. Uygulama local storage üzerinde tutulur ve farklı sekmelerden yapılan işlemlerde modal görünürlüğü aynı kalır. Alert bileşeni dinamiktir, veri tablosu bileşenini kendim yazdım ve her sütun için arama yapılabilmektedir. Apple'dan esinlenerek bir hesap makinesi bileşeni bulunmaktadır. Sipariş sepetine ürün ekleme, çıkarma, adet değiştirme, personel değiştirme gibi işlemler yapılabilir.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
