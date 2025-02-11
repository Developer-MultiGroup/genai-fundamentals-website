import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-5/6 lg:w-2/3 xl:w-5/12 m-auto my-8">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">Biz Kimiz?</AccordionTrigger>
        <AccordionContent>
          MultiGroup, 2020 yılında teknolojiye olan tutku ve merakını
          birleştiren yazılım geliştiricilerinin bir araya geldiği, büyümeyi, iş
          birliğini, yeniliği destekleyen ve yazılım dünyasında pozitif bir
          değişim yaratmayı hedefleyen kar amacı gütmeyen bir yazılım
          topluluğudur. Birleşmiş Milletler Sürdürülebilir Kalkınma Hedeflerini
          (SKH) benimseyerek, kaliteli eğitim, cinsiyet eşitliği,
          eşitsizliklerin azaltılması ve hedefler için ortaklık gibi önemli
          prensiplerini benimsemiş, geliştiricilerin bir araya gelip
          öğrenebileceği, büyüyebileceği ve birlikte daha güçlü bir ağ
          kurabileceği kapsayıcı bir ortam yaratmaktadır. “Where Developers
          Become Together!” mottosuyla sektörde kaliteli içerikler üretmeyi,
          yenilikçi fikirler geliştirmeyi ve güçlü bir sektörel network
          oluşturmayı en temel hedefimiz olarak belirliyoruz. Google, Akbank,
          Trendyol gibi sektörün öncü isimlerinin desteğiyle, birçok etkinlik,
          eğitim serisi ve konferans düzenliyoruz. Her bir etkinlik ile
          katılımcılara değerli deneyimler sunmayı ve onların kariyer
          yolculuklarında yeni kapılar açmayı amaçlıyoruz.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold">Ekibe üye olmak için ne yapmalıyım?</AccordionTrigger>
        <AccordionContent>
          MultiGroup yeni üyelere her zaman fırsat sunmayı amaçlayan gelişerek
          büyümeyi hedefleyen kar amacı gütmeyen ve her zaman heyecanlı üyeler
          arayan bir yazılım topluluğudur. MultiGroup yılın belli dönemlerinde
          sosyal medya üzerinden ''Developer Multigroup Ekibine Katılmak İster
          Misiniz? 🤩'' başlığı ile yeni üyeler aradığını duyurur. İlgili
          kişiler online başvuru formunu doldurarak ilk adımı tamamlayabilir.
          Başvuru değerlendirme sürecinde aynı heyecanı paylaştığımıza
          inandığımız kişiler ile online bir görüşme planlanır ve değerlendirme
          süreci sonunda ilgili kişilere bilgilendirme yapılır. Başvurunun kabul
          edilmesi ile üyeliğiniz onaylanır ve etkinliklerden, ağ oluşturma
          fırsatlarından faydalanmaya başlayabilirsiniz. Başvuru süreci online
          başvuru, değerlendirme ve görüşme, üyelik onayı aşamalarından oluşur.
          Başvuru için bu linki ziyaret edebilirsiniz. Seni aramızda görmek için
          sabırsızlanıyoruz!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold">
          Etkinliklerde konuşmacı olmak için ne yapmalıyım?
        </AccordionTrigger>
        <AccordionContent>
          MultiGroup alanında uzman kişiler ile sektör meraklılarını buluşturmak
          için sabırsızlanan bir yazılım topluluğudur. Etkinliklerimizde
          konuşmacı olmak için uzmanlık alanınızda ilgi çekici bir konu
          belirlemek ve bizim ile iletişime geçmek yeterli. Başvuru için:
          hello@multigroup.dev
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="font-bold">Partnerlik için ne yapmalıyım?</AccordionTrigger>
        <AccordionContent>
          MultiGroup, sektöre karşılıklı fayda sağlamak amacıyla partnerlik
          süreçlerini benimseyen bir yazılım topluluğudur. Faydayı maksimize
          edebileceğimiz her etkinlik, konferans ve projede işbirliğine önem
          veriyor, hayata geçirmek istediğiniz yeni fikirlerin bir parçası
          olmayı değerli bir fırsat olarak görüyoruz. Fikir ve önerileriniz için
          bizimle … aracılığıyla iletişime geçebilirsiniz.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
