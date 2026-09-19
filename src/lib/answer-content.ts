export const answerContent={
  tourism:{
    en:{heading:"What can I enquire about?",body:"The website presents Ajanta, Ellora, Ghrishneshwar, Trimbakeshwar and Bhimashankar. Choose a destination and share your date, pickup point and group details. An enquiry is not a fixed package or a confirmed itinerary."},
    mr:{heading:"मी कशाबद्दल चौकशी करू शकतो?",body:"वेबसाइटवर अजिंठा, वेरूळ, घृष्णेश्वर, त्र्यंबकेश्वर आणि भीमाशंकर ही स्थळे दाखवली आहेत. स्थळ निवडून तारीख, पिकअप ठिकाण आणि गटाचे तपशील पाठवा. चौकशी म्हणजे ठराविक पॅकेज किंवा निश्चित प्रवास आराखडा नाही."}
  },
  oneWay:{
    en:{heading:"What does one-way travel mean here?",body:"It means a point-to-point journey without a return trip in the same enquiry. Share the pickup, drop point, preferred date and passenger count so the requirement can be reviewed."},
    mr:{heading:"येथे एकमार्गी प्रवास म्हणजे काय?",body:"याचा अर्थ त्याच चौकशीत परतीचा प्रवास नसलेला एका ठिकाणाहून दुसऱ्या ठिकाणापर्यंतचा प्रवास. गरज पाहण्यासाठी पिकअप, ड्रॉप ठिकाण, पसंतीची तारीख आणि प्रवाशांची संख्या पाठवा."}
  },
  corporate:{
    en:{heading:"What should a corporate enquiry include?",body:"Share the company and contact details, route or stops, shift timings and approximate employee movement. The enquiry starts a review and does not promise a vehicle or availability."},
    mr:{heading:"कॉर्पोरेट चौकशीत काय समाविष्ट करावे?",body:"कंपनी व संपर्क तपशील, मार्ग किंवा थांबे, शिफ्टच्या वेळा आणि अंदाजे कर्मचारी प्रवास सांगा. चौकशीनंतर तपासणी सुरू होते; वाहन किंवा उपलब्धतेची हमी दिली जात नाही."}
  },
  contact:{
    en:{heading:"What happens after I submit?",body:"Your details are sent as a booking request for manual review. Kaaveri can then contact you to discuss the requirement. Submission does not confirm a booking, vehicle, itinerary, price or availability."},
    mr:{heading:"फॉर्म पाठवल्यानंतर काय होते?",body:"तुमचे तपशील मॅन्युअल तपासणीसाठी बुकिंग विनंती म्हणून पाठवले जातात. त्यानंतर गरजेबद्दल चर्चा करण्यासाठी कावेरी तुमच्याशी संपर्क करू शकते. फॉर्म पाठवल्याने बुकिंग, वाहन, प्रवास आराखडा, किंमत किंवा उपलब्धता निश्चित होत नाही."}
  }
} as const;
export type AnswerIntent=keyof typeof answerContent;
