"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.discover': 'Discover',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'discovery.title': 'Discover',
    'discovery.subtitle': 'Find and support organizations that matter to you.',
    'discovery.search': 'Search Non-profits...',
    'home.balanceTitle': 'Your Total Round-up Balance',
    'home.currency': 'EGP',
    'home.yourCharities': 'Your Charities',
    'home.allocation': 'allocation',
    'home.noFavorites': 'You haven\'t selected any favorite charities yet.',
    'home.addNonProfit': 'Add Non-Profit Organization',
    'home.makeDonation': 'Make Final Donation',
    'home.monthlyGoals': 'Monthly Goals',
    'home.roundUpLimit': 'Round-up Limit',
    'home.recentRoundUps': 'Recent Round-ups',
    'home.viewAll': 'View All',
    'org.donate': 'Donate Now',
    'org.addToFavorites': 'Add to Favorites',
    'org.impact': 'Your Impact',
    'org.amount': 'Amount',
    'org.contact': 'Contact Info',
    
    // Profile
    'profile.memberSince': 'Member since',
    'profile.totalDonated': 'Total Donated',
    'profile.avgMonth': 'Avg/Month',
    'profile.localImpact': 'Your Local Impact',
    'profile.accountSettings': 'Account Settings',
    'profile.taxReceipts': 'Tax Receipts',
    'profile.supportProvided': 'Support provided',
    'profile.generalSupport': 'General operational support',
    
    // Settings/Transactions
    'settings.title': 'Round-up Settings',
    'settings.subtitle': 'Manage how your transactions generate change.',
    'settings.maxLimit': 'Max Round-Up Limit',
    'settings.highestAmount': 'Highest amount to round up per transaction',
    'settings.recentTx': 'Recent Transactions',
    'settings.secure': 'Your connection is securely encrypted.',
    'settings.language': 'App Language',
    'settings.languageDesc': 'Choose your preferred language',
    
    // Org Page
    'org.about': 'About',
    'org.contributionSetup': 'Your Contribution Setup',
    'org.onetime': 'One-time',
    'org.monthly': 'Monthly',
    'org.balanceAllocation': 'Balance Allocation',
    'org.allocatePrefix': 'We will allocate',
    'org.allocateMid': 'from your donation to',
    'org.setFavorite': 'Set as Favorite & Allocate',
    'org.directImpact': 'Make a Direct Impact Now',
    'org.donateInstantly': 'Donate Instantly',
    'org.thankYou': 'Thank You!',
    'org.thankYouMsg': 'Your generosity makes a real difference. Your preferences have been successfully saved.',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.discover': 'اكتشاف',
    'nav.settings': 'الإعدادات',
    'nav.profile': 'حسابي',
    'discovery.title': 'اكتشاف',
    'discovery.subtitle': 'ابحث وادعم الجمعيات التي تهمك.',
    'discovery.search': 'بحث عن جمعيات خيرية...',
    'home.balanceTitle': 'رصيد الفكة الإجمالي',
    'home.currency': 'ج.م',
    'home.yourCharities': 'جمعياتك',
    'home.allocation': 'نسبة التبرع',
    'home.noFavorites': 'لم تقم بتحديد أيا من الجمعيات المفضلة بعد.',
    'home.addNonProfit': 'إضافة جمعية خيرية',
    'home.makeDonation': 'اتبرع دلوقتي',
    'home.monthlyGoals': 'أهدافك الشهرية',
    'home.roundUpLimit': 'الحد الأقصى للفكة',
    'home.recentRoundUps': 'أحدث المعاملات',
    'home.viewAll': 'عرض الكل',
    'org.donate': 'إتبرع دلوقتي',
    'org.addToFavorites': 'إضافة للمفضلة',
    'org.impact': 'تأثير تبرعك',
    'org.amount': 'المبلغ',
    'org.contact': 'معلومات التواصل',
    
    // Profile
    'profile.memberSince': 'عضو منذ',
    'profile.totalDonated': 'إجمالي التبرعات',
    'profile.avgMonth': 'المتوسط الشهري',
    'profile.localImpact': 'تأثيرك المجتمعي',
    'profile.accountSettings': 'إعدادات الحساب',
    'profile.taxReceipts': 'الإيصالات الضريبية',
    'profile.supportProvided': 'تم تقديم الدعم',
    'profile.generalSupport': 'الدعم التشغيلي العام',
    
    // Settings/Transactions
    'settings.title': 'إعدادات الفكة',
    'settings.subtitle': 'تحكم في كيفية تحويل فكة معاملاتك إلى تبرعات.',
    'settings.maxLimit': 'الحد الأقصى للفكة',
    'settings.highestAmount': 'أقصى مبلغ يمكن تحويله للفكة في المعاملة الواحدة',
    'settings.recentTx': 'أحدث المعاملات',
    'settings.secure': 'اتصالك مشفر وآمن تماماً.',
    'settings.language': 'لغة التطبيق',
    'settings.languageDesc': 'اختر لغتك المفضلة',
    
    // Org Page
    'org.about': 'عن الجمعية',
    'org.contributionSetup': 'إعدادات مساهمتك',
    'org.onetime': 'مرة واحدة',
    'org.monthly': 'شهرياً',
    'org.balanceAllocation': 'نسبة الاستقطاع',
    'org.allocatePrefix': 'سنقوم بتخصيص',
    'org.allocateMid': 'من تبرعك لصالح',
    'org.setFavorite': 'تعيين كمفضلة وحفظ الإعدادات',
    'org.directImpact': 'اصنع تأثيراً مباشراً الآن',
    'org.donateInstantly': 'تبرع فوراً',
    'org.thankYou': 'شكراً لك!',
    'org.thankYouMsg': 'كرمك يصنع فرقاً حقيقياً. تم حفظ تفضيلاتك بنجاح.',
    
    // Categories
    'Healthcare': 'الرعاية الصحية',
    'Orphanage and Social Support': 'رعاية الأيتام والدعم الاجتماعي',
    'Development and Humanitarian Aid': 'التنمية والمساعدات الإنسانية',
    'Disabled Individuals and Social Integration': 'ذوي الهمم والدمج المجتمعي',
    'Education': 'التعليم',
    'Poverty Alleviation and Food Security': 'القضاء على الفقر والأمن الغذائي',
    'Animal': 'رعاية الحيوان',

    // Charity Names
    'Baheya Foundation': 'مؤسسة بهية',
    'Children’s Cancer Hospital Egypt 57357': 'مستشفى سرطان الأطفال 57357',
    'Brooke Hospital': 'مستشفى بروك',
    'Egyptian Society for Mercy to Animals (ESMA)': 'الجمعية المصرية لرحمة الحيوان',
    'The Egyptian Food Bank': 'بنك الطعام المصري',
    'Egyptian Clothing Bank': 'بنك الكساء المصري',
    'Misr El Kheir Foundation': 'مؤسسة مصر الخير',
    'Dar El Orman': 'جمعية الأورمان',
    'Egyptian Red Crescent': 'الهلال الأحمر المصري',
    'Resala Charity Organization': 'جمعية رسالة للأعمال الخيرية',

    // Charity Descriptions
    'Nonprofit organization for early detection and breast cancer treatment.': 'مؤسسة غير ربحية للكشف المبكر وعلاج سرطان الثدي.',
    'Nonprofit organization to provide cancer treatments for children to achieve the dream of a better tomorrow.': 'مؤسسة غير ربحية تقدم علاج السرطان للأطفال لتحقيق حلم غد أفضل.',
    'Nonprofit organization dictated to improve the lives of horses, donkeys and mules by providing free medical treatment.': 'مؤسسة غير ربحية مكرسة لتحسين حياة الخيول والحمير من خلال توفير العلاج المجاني.',
    'Nonprofit organization admit animals who are in need of assistance due to severe injury, abuse, and neglect, provide them with food, shelter and basic medical care as they prepare them for adoption.': 'مؤسسة غير ربحية تستقبل الحيوانات التي تحتاج إلى مساعدة بسبب الإصابة أو سوء المعاملة أو الإهمال، وتوفر لهم الرعاية للتبني.',
    'Specialized in providing healthy food to those in need, supporting the most vulnerable families in Egypt, and addressing the challenges of accessing sufficient, safe, and nutritious food.': 'متخصصة في توفير الغذاء الصحي للمحتاجين، ودعم الأسر الأكثر ضعفاً في مصر لمواجهة تحديات الأمن الغذائي.',
    'Specialized in repurposing clothes and fabric waste through sorting, repairing, transforming, alternating, recycling, and upcycling to ultimately redistribute to underprivileged families, children, and youth.': 'متخصصة في إعادة تدوير الملابس والمنسوجات وتوزيعها على الأسر والأطفال المحتاجين.',
    'Comprehensive development organization focusing on health, education, scientific research, social solidarity, and aspects of life.': 'مؤسسة تنموية شاملة تركز على الصحة والتعليم والبحث العلمي والتكافل الاجتماعي.',
    'Serving Egyptian society through various development projects like orphanages, medical care, and village restorations.': 'تخدم المجتمع المصري من خلال مشاريع تنموية متنوعة مثل دور الأيتام والرعاية الطبية وترميم القرى.',
    'Provides humanitarian aid, disaster relief, and health services to vulnerable communities.': 'تقدم المساعدات الإنسانية والإغاثة في حالات الكوارث والخدمات الصحية للمجتمعات الضعيفة.',
    'Focuses on community development. It offers over 31 activities, including orphan care, assistance for people with disabilities, literacy training, and poverty alleviation.': 'تركز على تنمية المجتمع. تقدم أكثر من 31 نشاطاً تشمل رعاية الأيتام ومساعدة ذوي الإعاقة ومحو الأمية ومكافحة الفقر.',

    // User Data
    'Fatma Shouman': 'فاطمة شومان',

    // Impact Metrics
    '1 Mammogram Scan Contribution': 'مساهمة في فحص الماموجرام',
    'Chemotherapy Session Support': 'دعم جلسة علاج كيماوي',
    'Medical Supplies': 'إمدادات طبية',
    'Day of Care for a Child': 'يوم رعاية لطفل',
    'Basic Medical Treatment': 'علاج طبي أساسي',
    'Surgery & Rehabilitation': 'جراحة وإعادة تأهيل',
    'Food for 5 animals for a day': 'طعام لـ 5 حيوانات ليوم',
    'Vaccination Package': 'باقة تطعيمات',
    'Provide 1 hot meal': 'توفير وجبة ساخنة',
    'Monthly Food Box for a family': 'كرتونة طعام شهرية لأسرة',
    'Warm jacket for a child': 'جاكيت دافئ لطفل',
    'Full winter outfit': 'طقم شتوي كامل',
    'School Bag and Supplies': 'حقيبة مدرسية وأدوات',
    'Sponsor a Student’s Tuitions': 'التكفل بمصاريف طالب',
    'Support an Orphan per month': 'كفالة يتيم شهرياً',
    'Micro-project for a Widow': 'مشروع صغير لأرملة',
    'Emergency First Aid Kit': 'حقيبة إسعافات أولية للطوارئ',
    'Disaster Relief Package': 'حزمة إغاثة كوارث',
    'Skills Training Program': 'برنامج تدريب مهارات',

    // Merchants
    'Carrefour': 'كارفور',
    'Uber': 'أوبر',
    'Starbucks': 'ستاربكس',
    'Talabat': 'طلبات',
    'Costa': 'كوستا',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Sync HTML dir attribute when language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    // Check local lookup first, fallback to string if nothing
    const dictionary = translations[language];
    return dictionary[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
