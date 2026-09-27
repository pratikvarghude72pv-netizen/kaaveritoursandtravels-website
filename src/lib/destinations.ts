import {siteMedia,type SiteImage} from "@/lib/media";

type Copy={en:string;mr:string};

export type Destination={id:string;name:Copy;image:SiteImage;alt:Copy;tag:Copy;copy:Copy;distance:Copy;drive:Copy;duration:Copy;closed?:{day:number;note:Copy}};

/** Approximate road distances and drive times from Chhatrapati Sambhajinagar city; shown as "approx." everywhere. */
export const destinations:Destination[]=[
  {id:"ellora",name:{en:"Ellora",mr:"वेरूळ"},image:siteMedia.ellora,alt:{en:"Kailasa temple at the Ellora caves, Maharashtra",mr:"वेरूळ लेणीतील कैलास मंदिर, महाराष्ट्र"},
    tag:{en:"Buddhist, Hindu and Jain caves",mr:"बौद्ध, हिंदू आणि जैन लेणी"},
    copy:{en:"34 caves cut between roughly the 6th and 10th centuries. Cave 16, the Kailasa temple, was carved from the top down out of a single rock. Start there, before the midday heat.",mr:"साधारण सहाव्या ते दहाव्या शतकात कोरलेली ३४ लेणी. लेणी क्रमांक १६, कैलास मंदिर, एकाच खडकात वरून खाली कोरलेले आहे. दुपारच्या उन्हाआधी तिथून सुरुवात करा."},
    distance:{en:"approx. 30 km",mr:"सुमारे ३० किमी"},drive:{en:"about 45 min each way",mr:"एका बाजूने सुमारे ४५ मिनिटे"},duration:{en:"Half or full day",mr:"अर्धा किंवा पूर्ण दिवस"},
    closed:{day:2,note:{en:"Closed on Tuesdays",mr:"मंगळवारी बंद"}}},
  {id:"ghrishneshwar",name:{en:"Ghrishneshwar",mr:"घृष्णेश्वर"},image:siteMedia.ghrishneshwar,alt:{en:"Ghrishneshwar Jyotirlinga temple, Maharashtra",mr:"घृष्णेश्वर ज्योतिर्लिंग मंदिर, महाराष्ट्र"},
    tag:{en:"Jyotirlinga temple near Ellora",mr:"वेरूळजवळील ज्योतिर्लिंग मंदिर"},
    copy:{en:"One of the twelve Jyotirlinga temples, about a kilometre from the Ellora caves, so most visitors see both on the same day. Men remove their shirts before entering the inner sanctum. Queues are longest on Mondays and during Shravan.",mr:"बारा ज्योतिर्लिंगांपैकी एक, वेरूळ लेणीपासून सुमारे एक किलोमीटरवर; त्यामुळे बहुतेक भाविक दोन्ही ठिकाणे एकाच दिवशी पाहतात. गाभाऱ्यात जाण्यापूर्वी पुरुषांनी शर्ट काढावा लागतो. सोमवारी आणि श्रावणात रांगा सर्वात मोठ्या असतात."},
    distance:{en:"approx. 30 km",mr:"सुमारे ३० किमी"},drive:{en:"about 45 min each way",mr:"एका बाजूने सुमारे ४५ मिनिटे"},duration:{en:"Often paired with Ellora",mr:"सहसा वेरूळसोबत"}},
  {id:"ajanta",name:{en:"Ajanta",mr:"अजिंठा"},image:siteMedia.ajanta,alt:{en:"The Ajanta caves above the Waghur river, Maharashtra",mr:"वाघूर नदीवरील अजिंठा लेणी, महाराष्ट्र"},
    tag:{en:"Cave paintings and rock-cut monasteries",mr:"भित्तिचित्रे आणि शैलकोरीव विहार"},
    copy:{en:"About 30 Buddhist caves in a horseshoe bend of the Waghur river, with paintings from about the 2nd century BCE to the 5th century CE. Cars stop at the visitor centre and a site shuttle covers the last few kilometres. Leave early.",mr:"वाघूर नदीच्या नालाकृती वळणावर सुमारे ३० बौद्ध लेणी, ज्यांतील चित्रे साधारण इ.स.पू. दुसऱ्या शतकापासून इ.स. पाचव्या शतकापर्यंतची आहेत. गाड्या अभ्यागत केंद्रावर थांबतात; शेवटचे काही किलोमीटर तिथल्या शटलने जावे लागते. लवकर निघा."},
    distance:{en:"approx. 100 km",mr:"सुमारे १०० किमी"},drive:{en:"about 2.5 to 3 hrs each way",mr:"एका बाजूने सुमारे अडीच ते तीन तास"},duration:{en:"Full day",mr:"पूर्ण दिवस"},
    closed:{day:1,note:{en:"Closed on Mondays",mr:"सोमवारी बंद"}}},
  {id:"trimbakeshwar",name:{en:"Trimbakeshwar",mr:"त्र्यंबकेश्वर"},image:siteMedia.trimbakeshwar,alt:{en:"Trimbakeshwar Jyotirlinga temple, Nashik district",mr:"त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर, नाशिक जिल्हा"},
    tag:{en:"Jyotirlinga temple, Nashik district",mr:"ज्योतिर्लिंग मंदिर, नाशिक जिल्हा"},
    copy:{en:"Jyotirlinga temple at the foot of the Brahmagiri hills near Nashik, where the Godavari rises. Families usually leave before dawn, or stay a night in Trimbak or Nashik.",mr:"नाशिकजवळ ब्रह्मगिरीच्या पायथ्याशी, गोदावरीच्या उगमाजवळचे ज्योतिर्लिंग मंदिर. भाविक सहसा पहाटे निघतात किंवा त्र्यंबक किंवा नाशिकमध्ये एक रात्र मुक्काम करतात."},
    distance:{en:"approx. 210 km",mr:"सुमारे २१० किमी"},drive:{en:"about 5 hrs each way",mr:"एका बाजूने सुमारे ५ तास"},duration:{en:"Long day or overnight",mr:"दिवसभर किंवा मुक्कामी"}},
  {id:"bhimashankar",name:{en:"Bhimashankar",mr:"भीमाशंकर"},image:siteMedia.bhimashankar,alt:{en:"Monsoon forest near Bhimashankar in the Sahyadri hills",mr:"सह्याद्रीतील भीमाशंकर परिसराचे पावसाळी जंगल"},
    tag:{en:"Jyotirlinga temple in the Sahyadri forest",mr:"सह्याद्रीच्या जंगलातील ज्योतिर्लिंग मंदिर"},
    copy:{en:"Jyotirlinga temple inside the Bhimashankar Wildlife Sanctuary in Pune district. The last stretch is a ghat road that is often foggy in the monsoon, so plan it as an overnight trip.",mr:"पुणे जिल्ह्यातील भीमाशंकर वन्यजीव अभयारण्यातील ज्योतिर्लिंग मंदिर. शेवटचा टप्पा घाटरस्ता असून पावसाळ्यात तिथे अनेकदा धुके असते, म्हणून ही सहल मुक्कामी आखा."},
    distance:{en:"approx. 250 km",mr:"सुमारे २५० किमी"},drive:{en:"about 6 hrs each way",mr:"एका बाजूने सुमारे ६ तास"},duration:{en:"Overnight",mr:"मुक्कामी"}}
];
