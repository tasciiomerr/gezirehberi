// Supabase/Postgres CHECK-kısıtı hataları (kod 23514) client'a ham SQL
// metniyle gidiyordu — ör. "new row for relation \"routes\" violates check
// constraint \"routes_title_check\"" (rapor follow-up: kısa başlık girilince
// kullanıcı bu teknik mesajı görüyordu). Bu, kısıt adına göre anlaşılır bir
// Türkçe mesaja çeviriyor; eşleşmeyen durumlarda genel bir mesaja düşer,
// hiçbir zaman ham Postgres metnini olduğu gibi göstermez.
interface PostgrestErrorLike {
  code?: string;
  message?: string;
}

const CONSTRAINT_MESSAGES: Record<string, string> = {
  routes_title_check: "Rota başlığı 3-120 karakter arasında olmalı.",
  routes_days_check: "Gün sayısı 1-14 arasında olmalı.",
  routes_author_name_check: "İsim en fazla 40 karakter olabilir.",
  comments_text_check: "Yorum 1-1000 karakter arasında olmalı.",
  comments_rating_check: "Puan 1-5 arasında olmalı.",
  comments_author_name_check: "İsim en fazla 40 karakter olabilir.",
};

export function friendlyDbError(error: PostgrestErrorLike): string {
  if (error.code === "23514" && error.message) {
    const match = error.message.match(/constraint "([^"]+)"/);
    const constraintName = match?.[1];
    if (constraintName && CONSTRAINT_MESSAGES[constraintName]) {
      return CONSTRAINT_MESSAGES[constraintName];
    }
    return "Girdiğiniz bilgiler beklenen sınırların dışında, lütfen kontrol edip tekrar deneyin.";
  }
  if (error.code === "23503") {
    return "İlişkili kayıt bulunamadı, lütfen sayfayı yenileyip tekrar deneyin.";
  }
  return "Bir şeyler ters gitti, lütfen tekrar deneyin.";
}
