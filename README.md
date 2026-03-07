# PolonceKart · Lehçe–Türkçe Kelime Kartları

Lehçe kelime öğrenmek için sade, mobil öncelikli bir kelime kartı uygulaması — kurulum gerektirmeden tek HTML dosyasıyla çalışır.

![Karanlık Tema](https://img.shields.io/badge/Arayüz-Karanlık%20Tema-0e0e10?style=flat-square) ![Kurulum Yok](https://img.shields.io/badge/Kurulum-Gerekmiyor-5abf8a?style=flat-square) ![CSV Tabanlı](https://img.shields.io/badge/Veri-CSV%20Tabanlı-c9a96e?style=flat-square)

---

## Özellikler

- ilk aşamada **125 kelimelik B1 seviyesi** kelime seti eklendi, kelime sayısı arttırılacak
- **Kart çevirme** — kartın Türkçe çevirisini görmek için dokun
- **Kaydırma navigasyonu** — kartlar arasında sola/sağa kaydır, öğrenildi işaretlemek için yukarı kaydır
- **Cinsiyet rozetleri** — her isim için renk kodlu dilbilgisi cinsiyeti (eril, dişil, yansız, çoğul), fiil, sıfat ve zarf etiketleri
- **İlerleme çubuğu** — oturumdaki ilerlemeyi takip eder
- **Kalıcı seçimler** — öğrenildi işaretlenen kartlar `localStorage` ile oturumlar arasında saklanır
- **"Nasıl Kullanılır" penceresi** — hareket ve özellikler için uygulama içi rehber
- **Kurulum yok, sunucu yok** — tamamen tarayıcıda, statik dosyalarla çalışır

---

## Dosya Yapısı

```
/
├── index.html       # Ana uygulama (Türkçe arayüz)
└── kelimeler.csv    # B1 kelime seti (125 kelime)
```

> İngilizce versiyon aynı depoda `index-en.html`, `kelimeler-en.csv` ve `kelimeler-basic-en.csv` dosyalarıyla bulunmaktadır.

---

## CSV Formatı

Kelime seti pipe (`|`) ile ayrılmış formatı kullanır:

```
pl|g|ex_pl|tr|ex_tr
miejsce|nijaki|To jest piękne miejsce na piknik.|yer, mekan|Bu piknik için güzel bir yer.
```

| Sütun | Açıklama |
|-------|----------|
| `pl` | Lehçe kelime veya ifade |
| `g` | Dilbilgisi cinsiyeti / kelime türü (`meski`, `zenski`, `nijaki`, `cogul`, `fiil`, `sifat`, `zarf`) |
| `ex_pl` | Lehçe örnek cümle |
| `tr` | Türkçe çeviri |
| `ex_tr` | Türkçe örnek cümle |

---

## Kullanım

### Yerel Olarak Çalıştırma

`index.html` dosyasını herhangi bir modern tarayıcıda aç — derleme adımı gerekmez.

```bash
# İsteğe bağlı: CSV yüklemesinde CORS sorununu önlemek için basit bir yerel sunucu başlat
npx serve .
# ardından http://localhost:3000/index.html adresini aç
```

### Netlify'a Deploy Etme (veya herhangi bir statik host)

1. Tüm dosyaları bir Git deposuna yükle
2. Depoyu Netlify'a bağla
3. **Yayın dizini** olarak `/` (kök) ayarla
4. Deploy et — derleme komutu gerekmez

---

## Hareket Rehberi

| Hareket | İşlev |
|---------|-------|
| Karta dokun | Çeviriyi görmek için çevir |
| Sağa kaydır | Sonraki kart |
| Sola kaydır | Önceki kart |
| Yukarı kaydır | Öğrenildi olarak işaretle |

---

## Teknoloji

- Saf HTML / CSS / JavaScript — bağımlılık yok
- Google Fonts: DM Serif Display, DM Mono, Outfit
- CSV çalışma zamanında harici kütüphane olmadan ayrıştırılır
- Öğrenildi seçimlerini kalıcı hale getirmek için `localStorage`

---

## Lisans

MIT — serbestçe kullanabilir, uyarlayabilir ve paylaşabilirsiniz.

---

*Lehçe öğrenenler için yapıldı. Varşova'dan sevgiyle tasarlandı. 🇵🇱🇹🇷*
