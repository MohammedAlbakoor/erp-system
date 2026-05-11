export const clinicInfo = {
  name: 'DentaCare Clinic',
  tagline: 'A Healthy Smile Starts with Professional Care',
  description: 'We provide comprehensive dental care with the latest technology and a team of experienced professionals dedicated to your smile.',
  phone: '+1 (555) 123-4567',
  whatsapp: '+15551234567',
  email: 'info@dentacare.com',
  address: '123 Medical Center Blvd, Suite 200, New York, NY 10001',
  workingHours: {
    weekdays: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 3:00 PM',
    sunday: 'Closed',
  },
  socialMedia: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
  },
  stats: {
    yearsExperience: 15,
    happyPatients: 12000,
    successfulCases: 25000,
    rating: 4.9,
  },
};

export const services = [
  { id: 1, name: 'Teeth Cleaning', icon: '🦷', category: 'Preventive', duration: '45 min', price: 120, requiresAppointment: true, description: 'Professional teeth cleaning to remove plaque and tartar buildup.', fullDescription: 'Our professional teeth cleaning service removes plaque, tartar, and surface stains that regular brushing cannot eliminate. Using advanced ultrasonic technology and gentle polishing techniques, our hygienists ensure a thorough clean while maintaining the health of your gums.', steps: ['Initial examination', 'Ultrasonic scaling', 'Hand scaling', 'Polishing', 'Fluoride treatment'], beforeInstructions: ['Brush and floss before your appointment', 'List any medications you take'], afterInstructions: ['Avoid eating for 30 minutes', 'Continue regular brushing routine'], sessions: 1, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400' },
  { id: 2, name: 'Teeth Whitening', icon: '✨', category: 'Cosmetic', duration: '60 min', price: 350, requiresAppointment: true, description: 'Professional whitening for a brighter, more confident smile.', fullDescription: 'Our in-office teeth whitening treatment uses professional-grade bleaching agents to dramatically brighten your smile. The procedure is safe, effective, and can lighten your teeth by several shades in just one visit.', steps: ['Shade assessment', 'Gum protection', 'Whitening gel application', 'LED light activation', 'Final assessment'], beforeInstructions: ['Have your teeth cleaned first', 'Avoid staining foods for 48 hours prior'], afterInstructions: ['Avoid coffee, tea, and red wine for 48 hours', 'Use sensitivity toothpaste if needed'], sessions: 1, image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400' },
  { id: 3, name: 'Dental Implants', icon: '🔩', category: 'Surgical', duration: '90 min', price: 2500, requiresAppointment: true, description: 'Permanent tooth replacement with titanium implants.', fullDescription: 'Dental implants are the gold standard for replacing missing teeth. A titanium post is surgically placed in the jawbone to serve as an artificial root, topped with a custom crown that looks and functions like a natural tooth.', steps: ['CT scan and planning', 'Implant placement surgery', 'Healing period (3-6 months)', 'Abutment placement', 'Crown fitting'], beforeInstructions: ['Complete dental exam required', 'Inform us of all medications', 'No smoking for 2 weeks prior'], afterInstructions: ['Soft foods for 1 week', 'Take prescribed antibiotics', 'Avoid hard foods on implant side'], sessions: 4, image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400' },
  { id: 4, name: 'Orthodontics', icon: '😁', category: 'Orthodontic', duration: '30 min', price: 4500, requiresAppointment: true, description: 'Braces and clear aligners for perfectly aligned teeth.', fullDescription: 'Our orthodontic treatments include traditional braces, ceramic braces, and clear aligners to straighten your teeth and correct bite issues. We create a personalized treatment plan for optimal results.', steps: ['Initial consultation', 'X-rays and impressions', 'Treatment plan creation', 'Braces/aligner fitting', 'Regular adjustments', 'Retainer fitting'], beforeInstructions: ['Complete dental cleaning first', 'Treat any existing cavities'], afterInstructions: ['Follow dietary restrictions', 'Maintain excellent oral hygiene', 'Wear retainer as directed'], sessions: 24, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
  { id: 5, name: 'Root Canal', icon: '💉', category: 'Endodontic', duration: '75 min', price: 800, requiresAppointment: true, description: 'Save infected teeth with precise root canal therapy.', fullDescription: 'Root canal treatment removes infected pulp tissue from inside the tooth, eliminating pain and saving the natural tooth. Using advanced rotary instruments and digital imaging, we ensure precise and comfortable treatment.', steps: ['Digital X-ray', 'Local anesthesia', 'Access opening', 'Canal cleaning and shaping', 'Canal filling', 'Crown placement'], beforeInstructions: ['Take prescribed antibiotics if given', 'Eat before the appointment'], afterInstructions: ['Avoid chewing on treated side', 'Take pain medication as directed', 'Schedule crown placement'], sessions: 2, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400' },
  { id: 6, name: 'Cosmetic Fillings', icon: '💎', category: 'Restorative', duration: '45 min', price: 200, requiresAppointment: true, description: 'Tooth-colored fillings that blend naturally with your teeth.', fullDescription: 'Our composite resin fillings match your natural tooth color perfectly, providing both aesthetic appeal and structural support. These mercury-free fillings bond directly to the tooth for a stronger restoration.', steps: ['Decay removal', 'Tooth preparation', 'Composite application', 'Light curing', 'Shaping and polishing'], beforeInstructions: ['No special preparation needed'], afterInstructions: ['Avoid hard foods for 24 hours', 'Sensitivity is normal for a few days'], sessions: 1, image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400' },
  { id: 7, name: 'Dental Crowns', icon: '👑', category: 'Restorative', duration: '60 min', price: 1200, requiresAppointment: true, description: 'Custom-made crowns to restore damaged teeth.', fullDescription: 'Dental crowns completely cap damaged teeth, restoring their shape, strength, and appearance. We offer ceramic, porcelain-fused-to-metal, and zirconia crowns crafted to match your natural teeth.', steps: ['Tooth preparation', 'Digital impressions', 'Temporary crown placement', 'Lab fabrication', 'Permanent crown cementation'], beforeInstructions: ['Complete any root canal treatment first'], afterInstructions: ['Avoid sticky foods for 24 hours', 'Normal brushing and flossing around crown'], sessions: 2, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
  { id: 8, name: 'Gum Treatment', icon: '🩺', category: 'Periodontic', duration: '60 min', price: 400, requiresAppointment: true, description: 'Treatment for gum disease and periodontal issues.', fullDescription: 'Our periodontal treatments address gum disease at every stage, from gingivitis to advanced periodontitis. We use scaling and root planing, laser therapy, and surgical options when necessary.', steps: ['Periodontal assessment', 'Deep cleaning', 'Scaling and root planing', 'Antibiotic treatment', 'Follow-up evaluation'], beforeInstructions: ['Inform us of any blood thinning medications'], afterInstructions: ['Gentle brushing for 48 hours', 'Use prescribed mouth rinse', 'Avoid spicy foods'], sessions: 3, image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400' },
  { id: 9, name: 'Pediatric Dentistry', icon: '👶', category: 'Pediatric', duration: '30 min', price: 100, requiresAppointment: true, description: 'Gentle dental care designed for children of all ages.', fullDescription: 'Our pediatric dental services create a positive dental experience for children. From first tooth checkups to sealants and fluoride treatments, we make dental visits fun and stress-free.', steps: ['Child-friendly examination', 'Gentle cleaning', 'Fluoride application', 'Sealant placement if needed', 'Oral hygiene education'], beforeInstructions: ['Bring comfort items for your child', 'Explain the visit positively'], afterInstructions: ['Praise your child for being brave', 'Maintain brushing routine'], sessions: 1, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
  { id: 10, name: 'Hollywood Smile', icon: '🌟', category: 'Cosmetic', duration: '120 min', price: 8000, requiresAppointment: true, description: 'Complete smile makeover with porcelain veneers.', fullDescription: 'The Hollywood Smile is a complete smile transformation using ultra-thin porcelain veneers. Each veneer is custom-designed to create a perfectly symmetrical, bright, and natural-looking smile.', steps: ['Digital smile design', 'Tooth preparation', 'Impression taking', 'Veneer fabrication', 'Trial placement', 'Final bonding'], beforeInstructions: ['Teeth whitening recommended first', 'Discuss desired shade and shape'], afterInstructions: ['Avoid biting hard objects', 'Wear night guard if grinding', 'Regular dental checkups'], sessions: 3, image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400' },
  { id: 11, name: 'Tooth Extraction', icon: '🔧', category: 'Surgical', duration: '45 min', price: 250, requiresAppointment: true, description: 'Safe and comfortable tooth removal when needed.', fullDescription: 'When a tooth cannot be saved, our gentle extraction techniques ensure minimal discomfort and quick recovery. We also offer wisdom tooth extractions and surgical extractions for complex cases.', steps: ['X-ray assessment', 'Local anesthesia', 'Tooth loosening', 'Extraction', 'Socket care', 'Post-op instructions'], beforeInstructions: ['Eat a light meal before', 'Inform us of all medications', 'Arrange a ride home'], afterInstructions: ['Bite on gauze for 30 minutes', 'No straws for 24 hours', 'Soft foods for 3 days'], sessions: 1, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400' },
  { id: 12, name: 'Dental Bridges', icon: '🌉', category: 'Restorative', duration: '60 min', price: 1800, requiresAppointment: true, description: 'Bridge the gap with natural-looking dental bridges.', fullDescription: 'Dental bridges replace one or more missing teeth by anchoring to adjacent teeth. Our bridges are crafted from high-quality materials to match your natural teeth and restore full function.', steps: ['Adjacent tooth preparation', 'Impressions', 'Temporary bridge', 'Lab fabrication', 'Permanent bridge cementation'], beforeInstructions: ['Complete any needed treatments on anchor teeth'], afterInstructions: ['Use a floss threader under the bridge', 'Avoid hard and sticky foods initially'], sessions: 2, image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400' },
  { id: 13, name: 'Oral Surgery', icon: '🏥', category: 'Surgical', duration: '90 min', price: 1500, requiresAppointment: true, description: 'Advanced surgical procedures for complex dental cases.', fullDescription: 'Our oral surgery services include wisdom tooth removal, bone grafting, jaw surgery, and tissue biopsies. All procedures are performed with advanced anesthesia options for maximum comfort.', steps: ['Pre-surgical assessment', 'CT scan if needed', 'Anesthesia administration', 'Surgical procedure', 'Suturing', 'Recovery monitoring'], beforeInstructions: ['Fast for 8 hours before if using sedation', 'Arrange transportation home', 'Wear comfortable clothing'], afterInstructions: ['Rest for 24-48 hours', 'Apply ice packs', 'Take medications as prescribed'], sessions: 1, image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400' },
  { id: 14, name: 'Sensitivity Treatment', icon: '❄️', category: 'Preventive', duration: '30 min', price: 150, requiresAppointment: false, description: 'Relief from tooth sensitivity with professional treatments.', fullDescription: 'We offer multiple solutions for tooth sensitivity, including fluoride varnishes, desensitizing agents, and bonding treatments to seal exposed dentin and reduce discomfort from hot, cold, and sweet stimuli.', steps: ['Sensitivity assessment', 'Cause identification', 'Treatment application', 'Home care instructions'], beforeInstructions: ['Note which teeth are sensitive', 'Note triggers (hot, cold, sweet)'], afterInstructions: ['Use desensitizing toothpaste', 'Avoid extreme temperatures for 24 hours'], sessions: 1, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400' },
  { id: 15, name: 'Removable Prosthetics', icon: '🦷', category: 'Prosthetic', duration: '60 min', price: 1500, requiresAppointment: true, description: 'Custom dentures and removable dental prosthetics.', fullDescription: 'Our removable prosthetics include full dentures, partial dentures, and flexible dentures. Each prosthetic is custom-made for a comfortable fit and natural appearance.', steps: ['Impression taking', 'Bite registration', 'Try-in appointment', 'Final adjustments', 'Delivery and education'], beforeInstructions: ['Have any necessary extractions completed first'], afterInstructions: ['Start with soft foods', 'Practice speaking', 'Clean dentures daily'], sessions: 4, image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400' },
  { id: 16, name: 'Fixed Prosthetics', icon: '🔒', category: 'Prosthetic', duration: '75 min', price: 3000, requiresAppointment: true, description: 'Permanent prosthetic solutions for missing teeth.', fullDescription: 'Fixed prosthetics include implant-supported bridges and All-on-4 solutions that are permanently anchored in your mouth. These provide the most natural look and feel for replacing multiple missing teeth.', steps: ['Comprehensive evaluation', 'CT scan planning', 'Implant placement', 'Healing period', 'Prosthetic fabrication', 'Final placement'], beforeInstructions: ['Complete medical evaluation', 'Bone density assessment may be needed'], afterInstructions: ['Follow specific implant care instructions', 'Regular professional cleanings'], sessions: 5, image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400' },
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentistry & Cosmetic',
    title: 'Lead Dentist & Clinic Director',
    experience: 15,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    bio: 'Dr. Sarah Johnson is a highly skilled dentist with over 15 years of experience in general and cosmetic dentistry. She graduated from Columbia University College of Dental Medicine and has completed advanced training in implant dentistry and smile design.',
    certificates: ['DDS - Columbia University', 'Advanced Implantology Certification', 'Invisalign Certified Provider', 'Cosmetic Dentistry Fellowship'],
    languages: ['English', 'Spanish'],
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    services: [1, 2, 3, 6, 7, 10],
    rating: 4.9,
    reviewCount: 324,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Orthodontics',
    title: 'Senior Orthodontist',
    experience: 12,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    bio: 'Dr. Michael Chen specializes in orthodontics with a focus on modern alignment techniques. He is a certified provider of Invisalign and traditional braces, helping patients of all ages achieve beautiful, straight smiles.',
    certificates: ['DMD - Harvard School of Dental Medicine', 'Board Certified Orthodontist', 'Invisalign Diamond Provider', 'Lingual Orthodontics Certification'],
    languages: ['English', 'Mandarin'],
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    services: [4, 9],
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Endodontics & Periodontics',
    title: 'Endodontist',
    experience: 10,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400',
    bio: 'Dr. Emily Rodriguez is an expert in root canal therapy and gum treatments. With a gentle approach and advanced microscopic techniques, she ensures comfortable and successful treatments for complex cases.',
    certificates: ['DDS - NYU College of Dentistry', 'Endodontic Specialty Certificate', 'Laser Dentistry Certification', 'Microsurgery Training'],
    languages: ['English', 'Portuguese'],
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    services: [5, 8, 14],
    rating: 4.9,
    reviewCount: 198,
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Oral Surgery & Implantology',
    title: 'Oral Surgeon',
    experience: 18,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
    bio: 'Dr. James Wilson is a board-certified oral surgeon with expertise in dental implants, wisdom tooth extraction, and complex surgical procedures. His extensive surgical experience ensures safe and precise outcomes.',
    certificates: ['MD/DDS - Johns Hopkins University', 'Board Certified Oral Surgeon', 'Implant Surgery Fellowship', 'IV Sedation Certified'],
    languages: ['English', 'French'],
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    services: [3, 11, 12, 13, 15, 16],
    rating: 4.9,
    reviewCount: 412,
  },
];

export const reviews = [
  { id: 1, name: 'John D.', rating: 5, text: 'Absolutely amazing experience! Dr. Johnson made me feel completely at ease during my dental implant procedure. The results are incredible - my new teeth look and feel completely natural.', service: 'Dental Implants', date: '2024-12-15', doctorId: 1 },
  { id: 2, name: 'Maria S.', rating: 5, text: 'Dr. Chen transformed my smile with Invisalign! The entire process was smooth and the results exceeded my expectations. The staff is incredibly friendly and professional.', service: 'Orthodontics', date: '2024-11-28', doctorId: 2 },
  { id: 3, name: 'Robert K.', rating: 5, text: 'I was terrified of root canals but Dr. Rodriguez made it completely painless. She explained every step and I felt no discomfort at all. Highly recommend!', service: 'Root Canal', date: '2024-11-10', doctorId: 3 },
  { id: 4, name: 'Lisa M.', rating: 4, text: 'Great experience with teeth whitening. My teeth are several shades whiter and the results are very natural looking. The whole procedure took about an hour.', service: 'Teeth Whitening', date: '2024-10-22', doctorId: 1 },
  { id: 5, name: 'David W.', rating: 5, text: 'Dr. Wilson removed my wisdom teeth with incredible skill. Recovery was much faster than expected. The follow-up care was excellent too.', service: 'Oral Surgery', date: '2024-10-05', doctorId: 4 },
  { id: 6, name: 'Jennifer P.', rating: 5, text: 'The Hollywood Smile makeover changed my life! I cannot stop smiling now. Dr. Johnson is a true artist. Every detail was perfect.', service: 'Hollywood Smile', date: '2024-09-18', doctorId: 1 },
  { id: 7, name: 'Ahmed R.', rating: 5, text: 'Best dental clinic I have ever visited. The facility is modern, clean, and the entire team is professional. My whole family comes here now.', service: 'Teeth Cleaning', date: '2024-09-01', doctorId: 1 },
  { id: 8, name: 'Sarah L.', rating: 4, text: 'Very professional service. The dental crown matches my other teeth perfectly. Dr. Johnson took the time to get the color just right.', service: 'Dental Crowns', date: '2024-08-15', doctorId: 1 },
];

export const articles = [
  { id: 1, title: 'When Should You Visit the Dentist?', excerpt: 'Learn about the recommended dental visit schedule and signs that you need immediate dental attention.', content: 'Regular dental visits are essential for maintaining oral health. The American Dental Association recommends visiting your dentist at least twice a year for routine checkups and cleanings...', category: 'Preventive Care', date: '2024-12-01', readTime: '5 min', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', keywords: ['dental visit', 'preventive care', 'oral health'] },
  { id: 2, title: 'Whitening vs Cleaning: What\'s the Difference?', excerpt: 'Understanding the key differences between professional teeth whitening and dental cleaning.', content: 'Many patients confuse teeth whitening with teeth cleaning, but they serve very different purposes. Teeth cleaning removes plaque and tartar to prevent gum disease, while whitening addresses tooth discoloration...', category: 'Education', date: '2024-11-15', readTime: '4 min', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', keywords: ['whitening', 'cleaning', 'cosmetic dentistry'] },
  { id: 3, title: 'Tips After Dental Implant Surgery', excerpt: 'Essential care instructions and tips for a smooth recovery after dental implant placement.', content: 'Dental implant surgery requires careful post-operative care for successful healing. During the first 24 hours, apply ice packs and take prescribed medications. Stick to soft foods...', category: 'Post-Treatment', date: '2024-11-01', readTime: '6 min', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400', keywords: ['dental implants', 'recovery', 'post-surgery care'] },
  { id: 4, title: 'How to Care for Your Children\'s Teeth', excerpt: 'A parent\'s guide to establishing good dental habits from infancy through teenage years.', content: 'Starting good dental habits early is crucial for your child\'s oral health. Begin cleaning your baby\'s gums with a soft cloth even before teeth appear. Use a small, soft-bristled toothbrush...', category: 'Pediatric', date: '2024-10-15', readTime: '7 min', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400', keywords: ['pediatric dentistry', 'children teeth', 'dental habits'] },
  { id: 5, title: 'Causes of Gum Bleeding and Treatment', excerpt: 'Why your gums might be bleeding and what you can do about it.', content: 'Bleeding gums can be a sign of gingivitis, the early stage of gum disease. Poor oral hygiene, hormonal changes, medications, and certain health conditions can all contribute to bleeding gums...', category: 'Periodontics', date: '2024-10-01', readTime: '5 min', image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400', keywords: ['gum disease', 'bleeding gums', 'periodontal health'] },
  { id: 6, title: 'When Do You Need Root Canal Treatment?', excerpt: 'Signs and symptoms that indicate you might need root canal therapy.', content: 'Root canal treatment becomes necessary when the pulp inside your tooth becomes infected or inflamed. Common symptoms include severe toothache, prolonged sensitivity to hot or cold, darkening of the tooth...', category: 'Endodontics', date: '2024-09-15', readTime: '5 min', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', keywords: ['root canal', 'tooth pain', 'endodontic treatment'] },
];

export const beforeAfterCases = [
  { id: 1, category: 'Cosmetic', treatment: 'Hollywood Smile', duration: '3 weeks', beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', doctorNotes: 'Patient received 10 ultra-thin porcelain veneers on the upper arch. Color matched to a bright but natural shade.', doctorId: 1 },
  { id: 2, category: 'Orthodontic', treatment: 'Invisalign', duration: '12 months', beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400', afterImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400', doctorNotes: 'Moderate crowding corrected with 24 sets of clear aligners. Patient compliance was excellent.', doctorId: 2 },
  { id: 3, category: 'Implant', treatment: 'Full Arch Implants', duration: '6 months', beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400', afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', doctorNotes: 'All-on-4 implant restoration of the upper arch. Patient regained full function and aesthetics.', doctorId: 4 },
];

export const patients = [
  { id: 1, fullName: 'John Smith', phone: '+1-555-0101', whatsapp: '+15550101', email: 'john.smith@email.com', gender: 'Male', birthDate: '1985-03-15', age: 39, address: '456 Oak Street', city: 'New York', maritalStatus: 'Married', profession: 'Engineer', referralSource: 'Google', notes: 'Prefers morning appointments', medicalInfo: { chronicDiseases: 'None', allergies: 'Penicillin', currentMedications: 'None', diabetes: false, highBloodPressure: false, heartDisease: false, pregnant: false, bleedingProblems: false, anesthesiaAllergy: false, medicalNotes: 'Allergic to penicillin - use alternative antibiotics' }, fileNumber: 'PT-001', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, fullName: 'Maria Garcia', phone: '+1-555-0102', whatsapp: '+15550102', email: 'maria.garcia@email.com', gender: 'Female', birthDate: '1990-07-22', age: 34, address: '789 Pine Avenue', city: 'New York', maritalStatus: 'Single', profession: 'Teacher', referralSource: 'Referral', notes: '', medicalInfo: { chronicDiseases: 'Asthma', allergies: 'None', currentMedications: 'Inhaler', diabetes: false, highBloodPressure: false, heartDisease: false, pregnant: false, bleedingProblems: false, anesthesiaAllergy: false, medicalNotes: 'Has asthma - keep inhaler accessible during treatment' }, fileNumber: 'PT-002', status: 'Active', createdAt: '2024-02-20' },
  { id: 3, fullName: 'Robert Williams', phone: '+1-555-0103', whatsapp: '+15550103', email: 'robert.w@email.com', gender: 'Male', birthDate: '1972-11-08', age: 52, address: '321 Elm Boulevard', city: 'Brooklyn', maritalStatus: 'Married', profession: 'Accountant', referralSource: 'Walk-in', notes: 'Diabetic patient - requires special care', medicalInfo: { chronicDiseases: 'Type 2 Diabetes', allergies: 'Latex', currentMedications: 'Metformin, Lisinopril', diabetes: true, highBloodPressure: true, heartDisease: false, pregnant: false, bleedingProblems: false, anesthesiaAllergy: false, medicalNotes: 'Diabetes Type 2 controlled with medication. Monitor blood sugar before procedures.' }, fileNumber: 'PT-003', status: 'Active', createdAt: '2024-03-10' },
  { id: 4, fullName: 'Emily Davis', phone: '+1-555-0104', whatsapp: '+15550104', email: 'emily.d@email.com', gender: 'Female', birthDate: '1995-05-30', age: 29, address: '654 Maple Drive', city: 'Manhattan', maritalStatus: 'Single', profession: 'Designer', referralSource: 'Instagram', notes: 'Interested in cosmetic procedures', medicalInfo: { chronicDiseases: 'None', allergies: 'None', currentMedications: 'Birth control pills', diabetes: false, highBloodPressure: false, heartDisease: false, pregnant: false, bleedingProblems: false, anesthesiaAllergy: false, medicalNotes: '' }, fileNumber: 'PT-004', status: 'Active', createdAt: '2024-04-05' },
  { id: 5, fullName: 'James Brown', phone: '+1-555-0105', whatsapp: '+15550105', email: 'james.b@email.com', gender: 'Male', birthDate: '1968-09-12', age: 56, address: '987 Cedar Lane', city: 'Queens', maritalStatus: 'Divorced', profession: 'Retired', referralSource: 'Referral', notes: '', medicalInfo: { chronicDiseases: 'Hypertension, Arthritis', allergies: 'Ibuprofen', currentMedications: 'Amlodipine, Acetaminophen', diabetes: false, highBloodPressure: true, heartDisease: true, pregnant: false, bleedingProblems: true, anesthesiaAllergy: false, medicalNotes: 'Heart condition - consult cardiologist before surgical procedures. Takes blood thinners.' }, fileNumber: 'PT-005', status: 'Active', createdAt: '2024-05-18' },
];

export const appointments = [
  { id: 1, patientId: 1, doctorId: 1, serviceId: 1, date: '2025-05-10', startTime: '09:00', endTime: '09:45', status: 'Completed', notes: 'Regular cleaning', isFirstVisit: false, hasEmergency: false },
  { id: 2, patientId: 2, doctorId: 2, serviceId: 4, date: '2025-05-10', startTime: '10:00', endTime: '10:30', status: 'Confirmed', notes: 'Invisalign adjustment', isFirstVisit: false, hasEmergency: false },
  { id: 3, patientId: 3, doctorId: 3, serviceId: 5, date: '2025-05-10', startTime: '11:00', endTime: '12:15', status: 'Waiting', notes: 'Root canal - second session', isFirstVisit: false, hasEmergency: false },
  { id: 4, patientId: 4, doctorId: 1, serviceId: 10, date: '2025-05-10', startTime: '14:00', endTime: '16:00', status: 'New', notes: 'Hollywood smile consultation', isFirstVisit: true, hasEmergency: false },
  { id: 5, patientId: 5, doctorId: 4, serviceId: 11, date: '2025-05-10', startTime: '15:00', endTime: '15:45', status: 'Emergency', notes: 'Severe tooth pain - emergency extraction', isFirstVisit: false, hasEmergency: true },
  { id: 6, patientId: 1, doctorId: 1, serviceId: 2, date: '2025-05-11', startTime: '09:00', endTime: '10:00', status: 'Confirmed', notes: 'Whitening session', isFirstVisit: false, hasEmergency: false },
  { id: 7, patientId: 2, doctorId: 2, serviceId: 4, date: '2025-05-12', startTime: '10:00', endTime: '10:30', status: 'Confirmed', notes: 'Invisalign check', isFirstVisit: false, hasEmergency: false },
  { id: 8, patientId: 3, doctorId: 4, serviceId: 3, date: '2025-05-13', startTime: '11:00', endTime: '12:30', status: 'New', notes: 'Implant consultation', isFirstVisit: false, hasEmergency: false },
];

export const visits = [
  { id: 1, patientId: 1, doctorId: 1, appointmentId: 1, date: '2025-05-10', complaint: 'Routine cleaning', diagnosis: 'Mild tartar buildup on lower incisors', treatment: 'Full scaling and polishing', treatedTeeth: [31, 32, 41, 42], notes: 'Good overall oral health. Recommended flossing more regularly.', nextVisitDate: '2025-11-10', cost: 120, paymentStatus: 'Paid' },
  { id: 2, patientId: 2, doctorId: 2, appointmentId: null, date: '2025-04-15', complaint: 'Orthodontic follow-up', diagnosis: 'Progressing well with aligner set 12/24', treatment: 'Aligner adjustment and new set provided', treatedTeeth: [], notes: 'Patient compliance excellent. On track for completion in 6 months.', nextVisitDate: '2025-05-12', cost: 0, paymentStatus: 'Included in plan' },
];

export const treatmentPlans = [
  { id: 1, patientId: 1, doctorId: 1, title: 'Comprehensive Restoration Plan', diagnosis: 'Multiple teeth require restoration due to old failing fillings', totalCost: 4500, discount: 500, paidAmount: 2000, status: 'In Progress', createdAt: '2025-01-15', items: [{ id: 1, serviceId: 6, toothNumber: 14, price: 200, status: 'Completed' }, { id: 2, serviceId: 6, toothNumber: 15, price: 200, status: 'Completed' }, { id: 3, serviceId: 7, toothNumber: 16, price: 1200, status: 'In Progress' }, { id: 4, serviceId: 5, toothNumber: 26, price: 800, status: 'Pending' }, { id: 5, serviceId: 7, toothNumber: 26, price: 1200, status: 'Pending' }, { id: 6, serviceId: 1, toothNumber: null, price: 120, status: 'Completed' }] },
  { id: 2, patientId: 4, doctorId: 1, title: 'Hollywood Smile Makeover', diagnosis: 'Patient desires cosmetic enhancement of upper anterior teeth', totalCost: 10000, discount: 1000, paidAmount: 3000, status: 'Proposed', createdAt: '2025-04-20', items: [{ id: 7, serviceId: 1, toothNumber: null, price: 120, status: 'Pending' }, { id: 8, serviceId: 2, toothNumber: null, price: 350, status: 'Pending' }, { id: 9, serviceId: 10, toothNumber: null, price: 8000, status: 'Pending' }] },
];

export const invoices = [
  { id: 1, invoiceNumber: 'INV-2025-001', patientId: 1, serviceId: 1, doctorId: 1, date: '2025-05-10', total: 120, discount: 0, tax: 0, paid: 120, remaining: 0, status: 'Paid', paymentMethod: 'Card' },
  { id: 2, invoiceNumber: 'INV-2025-002', patientId: 2, serviceId: 4, doctorId: 2, date: '2025-04-15', total: 4500, discount: 500, tax: 0, paid: 2000, remaining: 2000, status: 'Partially Paid', paymentMethod: 'Installments' },
  { id: 3, invoiceNumber: 'INV-2025-003', patientId: 3, serviceId: 5, doctorId: 3, date: '2025-05-10', total: 800, discount: 0, tax: 0, paid: 0, remaining: 800, status: 'Unpaid', paymentMethod: null },
  { id: 4, invoiceNumber: 'INV-2025-004', patientId: 4, serviceId: 10, doctorId: 1, date: '2025-04-20', total: 10000, discount: 1000, tax: 0, paid: 3000, remaining: 6000, status: 'Partially Paid', paymentMethod: 'Installments' },
  { id: 5, invoiceNumber: 'INV-2025-005', patientId: 5, serviceId: 11, doctorId: 4, date: '2025-05-10', total: 250, discount: 0, tax: 0, paid: 250, remaining: 0, status: 'Paid', paymentMethod: 'Cash' },
];

export const payments = [
  { id: 1, invoiceId: 1, amount: 120, method: 'Card', date: '2025-05-10' },
  { id: 2, invoiceId: 2, amount: 1000, method: 'Bank Transfer', date: '2025-04-15' },
  { id: 3, invoiceId: 2, amount: 1000, method: 'Cash', date: '2025-05-01' },
  { id: 4, invoiceId: 4, amount: 3000, method: 'Bank Transfer', date: '2025-04-20' },
  { id: 5, invoiceId: 5, amount: 250, method: 'Cash', date: '2025-05-10' },
];

export const prescriptions = [
  { id: 1, patientId: 1, doctorId: 1, date: '2025-05-10', notes: 'Post-cleaning care', items: [{ id: 1, medicineName: 'Chlorhexidine Mouthwash', dosage: '15ml', duration: '7 days', instructions: 'Rinse twice daily after brushing' }] },
  { id: 2, patientId: 3, doctorId: 3, date: '2025-05-10', notes: 'Post root canal medications', items: [{ id: 2, medicineName: 'Amoxicillin 500mg', dosage: '1 capsule', duration: '7 days', instructions: 'Three times daily after meals' }, { id: 3, medicineName: 'Ibuprofen 400mg', dosage: '1 tablet', duration: '5 days', instructions: 'As needed for pain, max 3 times daily' }] },
  { id: 3, patientId: 5, doctorId: 4, date: '2025-05-10', notes: 'Post extraction care', items: [{ id: 4, medicineName: 'Amoxicillin 500mg', dosage: '1 capsule', duration: '5 days', instructions: 'Three times daily after meals' }, { id: 5, medicineName: 'Paracetamol 500mg', dosage: '1-2 tablets', duration: '3 days', instructions: 'Every 6 hours as needed for pain' }, { id: 6, medicineName: 'Chlorhexidine Mouthwash', dosage: '15ml', duration: '7 days', instructions: 'Gentle rinse twice daily starting day 2' }] },
];

export const inventoryItems = [
  { id: 1, name: 'Lidocaine 2% Anesthetic', quantity: 150, unit: 'Cartridges', minQuantity: 50, expiryDate: '2026-03-15', supplierId: 1, purchasePrice: 2.50, category: 'Anesthetic' },
  { id: 2, name: 'Nitrile Gloves (Medium)', quantity: 2000, unit: 'Pairs', minQuantity: 500, expiryDate: '2027-01-01', supplierId: 2, purchasePrice: 0.15, category: 'Protective Equipment' },
  { id: 3, name: 'Surgical Masks', quantity: 1500, unit: 'Pieces', minQuantity: 300, expiryDate: '2027-06-01', supplierId: 2, purchasePrice: 0.10, category: 'Protective Equipment' },
  { id: 4, name: 'Composite Resin (A2 Shade)', quantity: 25, unit: 'Syringes', minQuantity: 10, expiryDate: '2026-08-20', supplierId: 1, purchasePrice: 45.00, category: 'Filling Materials' },
  { id: 5, name: 'Whitening Gel 35%', quantity: 8, unit: 'Kits', minQuantity: 5, expiryDate: '2025-12-01', supplierId: 3, purchasePrice: 85.00, category: 'Whitening Materials' },
  { id: 6, name: 'Root Canal Files Set', quantity: 30, unit: 'Sets', minQuantity: 15, expiryDate: '2028-01-01', supplierId: 1, purchasePrice: 35.00, category: 'Root Canal Materials' },
  { id: 7, name: 'Alginate Impression Material', quantity: 12, unit: 'Bags', minQuantity: 5, expiryDate: '2026-05-10', supplierId: 3, purchasePrice: 22.00, category: 'Impression Materials' },
  { id: 8, name: 'Autoclave Sterilization Pouches', quantity: 800, unit: 'Pieces', minQuantity: 200, expiryDate: '2028-01-01', supplierId: 2, purchasePrice: 0.08, category: 'Sterilization' },
  { id: 9, name: 'Dental Implant (Titanium)', quantity: 15, unit: 'Pieces', minQuantity: 5, expiryDate: '2030-01-01', supplierId: 4, purchasePrice: 350.00, category: 'Implant Materials' },
  { id: 10, name: 'Surgical Sutures 4-0', quantity: 40, unit: 'Packets', minQuantity: 20, expiryDate: '2026-11-15', supplierId: 1, purchasePrice: 8.00, category: 'Surgical Tools' },
];

export const suppliers = [
  { id: 1, name: 'DentalSupply Pro', phone: '+1-555-0201', address: '100 Medical Supply Ave, New York', products: ['Anesthetics', 'Filling Materials', 'Root Canal Materials', 'Surgical Tools'], notes: 'Primary supplier - fast delivery' },
  { id: 2, name: 'MedProtect Inc.', phone: '+1-555-0202', address: '200 Healthcare Blvd, New Jersey', products: ['Gloves', 'Masks', 'Sterilization Equipment'], notes: 'Bulk order discounts available' },
  { id: 3, name: 'SmileTech Supplies', phone: '+1-555-0203', address: '300 Innovation Dr, Connecticut', products: ['Whitening Materials', 'Impression Materials', 'Cosmetic Products'], notes: 'Premium products, 2-week delivery' },
  { id: 4, name: 'ImplantDirect USA', phone: '+1-555-0204', address: '400 Implant Way, California', products: ['Dental Implants', 'Abutments', 'Surgical Guides'], notes: 'Industry-leading implant systems' },
];

export const laboratories = [
  { id: 1, name: 'PrecisionDental Lab', phone: '+1-555-0301', address: '500 Lab Avenue, New York', workType: ['Crowns', 'Bridges', 'Veneers', 'Dentures'], cases: [{ id: 1, patientId: 1, type: 'Zirconia Crown', tooth: 16, status: 'In Progress', sentDate: '2025-05-08', expectedDate: '2025-05-15', cost: 250 }, { id: 2, patientId: 4, type: 'Porcelain Veneers x10', tooth: null, status: 'Sent', sentDate: '2025-05-09', expectedDate: '2025-05-20', cost: 2000 }] },
  { id: 2, name: 'SmileCraft Laboratory', phone: '+1-555-0302', address: '600 Craft Street, Brooklyn', workType: ['Implant Components', 'Surgical Guides', 'Night Guards'], cases: [{ id: 3, patientId: 3, type: 'Surgical Guide', tooth: null, status: 'Ready', sentDate: '2025-05-01', expectedDate: '2025-05-10', cost: 350 }] },
];

export const expenses = [
  { id: 1, category: 'Rent', description: 'Monthly clinic rent', amount: 5000, date: '2025-05-01', recurring: true },
  { id: 2, category: 'Salaries', description: 'Staff salaries - May', amount: 15000, date: '2025-05-01', recurring: true },
  { id: 3, category: 'Medical Materials', description: 'Monthly supplies order', amount: 2500, date: '2025-05-03', recurring: false },
  { id: 4, category: 'Equipment', description: 'New dental chair cushions', amount: 800, date: '2025-05-05', recurring: false },
  { id: 5, category: 'Maintenance', description: 'X-ray machine calibration', amount: 350, date: '2025-05-07', recurring: false },
  { id: 6, category: 'Sterilization', description: 'Autoclave service', amount: 200, date: '2025-05-08', recurring: false },
  { id: 7, category: 'Laboratories', description: 'Lab work - crowns and veneers', amount: 2250, date: '2025-05-09', recurring: false },
  { id: 8, category: 'General', description: 'Cleaning service', amount: 400, date: '2025-05-10', recurring: true },
];

export const users = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah@dentacare.com', role: 'Admin', status: 'Active', lastLogin: '2025-05-10 08:30', avatar: 'SJ' },
  { id: 2, name: 'Dr. Michael Chen', email: 'michael@dentacare.com', role: 'Doctor', status: 'Active', lastLogin: '2025-05-10 09:15', avatar: 'MC' },
  { id: 3, name: 'Dr. Emily Rodriguez', email: 'emily@dentacare.com', role: 'Doctor', status: 'Active', lastLogin: '2025-05-10 10:00', avatar: 'ER' },
  { id: 4, name: 'Dr. James Wilson', email: 'james@dentacare.com', role: 'Doctor', status: 'Active', lastLogin: '2025-05-09 16:45', avatar: 'JW' },
  { id: 5, name: 'Lisa Martinez', email: 'lisa@dentacare.com', role: 'Secretary', status: 'Active', lastLogin: '2025-05-10 07:55', avatar: 'LM' },
  { id: 6, name: 'Tom Anderson', email: 'tom@dentacare.com', role: 'Accountant', status: 'Active', lastLogin: '2025-05-09 17:00', avatar: 'TA' },
];

export const auditLog = [
  { id: 1, userId: 1, action: 'Created Patient', target: 'Emily Davis (PT-004)', timestamp: '2025-05-10 14:00', ip: '192.168.1.100' },
  { id: 2, userId: 5, action: 'Scheduled Appointment', target: 'John Smith - Teeth Cleaning', timestamp: '2025-05-10 13:30', ip: '192.168.1.101' },
  { id: 3, userId: 1, action: 'Created Invoice', target: 'INV-2025-001', timestamp: '2025-05-10 12:00', ip: '192.168.1.100' },
  { id: 4, userId: 6, action: 'Recorded Payment', target: 'INV-2025-001 - $120', timestamp: '2025-05-10 12:05', ip: '192.168.1.102' },
  { id: 5, userId: 3, action: 'Updated Medical File', target: 'Robert Williams (PT-003)', timestamp: '2025-05-10 11:30', ip: '192.168.1.103' },
  { id: 6, userId: 4, action: 'Viewed Sensitive File', target: 'X-ray - James Brown (PT-005)', timestamp: '2025-05-10 11:00', ip: '192.168.1.104' },
  { id: 7, userId: 1, action: 'Created Treatment Plan', target: 'Hollywood Smile - Emily Davis', timestamp: '2025-05-10 10:30', ip: '192.168.1.100' },
  { id: 8, userId: 5, action: 'Cancelled Appointment', target: 'Maria Garcia - 2025-05-08', timestamp: '2025-05-08 09:00', ip: '192.168.1.101' },
];

export const dentalChartData = {
  1: [
    { toothNumber: 14, status: 'Filling', treatment: 'Composite filling', notes: 'Mesial filling placed 2025-01' },
    { toothNumber: 15, status: 'Filling', treatment: 'Composite filling', notes: 'Occlusal filling placed 2025-02' },
    { toothNumber: 16, status: 'Crown', treatment: 'Zirconia crown in progress', notes: 'Crown preparation done, temp crown in place' },
    { toothNumber: 26, status: 'Decay', treatment: 'Needs root canal + crown', notes: 'Deep decay approaching pulp' },
    { toothNumber: 36, status: 'Missing', treatment: 'Extracted 2023', notes: 'Consider implant replacement' },
    { toothNumber: 18, status: 'Extracted', treatment: 'Wisdom tooth removed', notes: 'Extracted 2020' },
    { toothNumber: 28, status: 'Extracted', treatment: 'Wisdom tooth removed', notes: 'Extracted 2020' },
    { toothNumber: 38, status: 'Healthy', treatment: '', notes: 'Wisdom tooth present, no issues' },
    { toothNumber: 48, status: 'Extracted', treatment: 'Wisdom tooth removed', notes: 'Extracted 2021' },
  ],
};

export const toothStatuses = [
  'Healthy', 'Decay', 'Filling', 'Root Canal', 'Crown', 'Missing', 'Implant', 'Extracted', 'Fracture', 'Infection', 'Needs Follow-up'
];

export const appointmentStatuses = ['New', 'Confirmed', 'Waiting', 'Completed', 'Cancelled', 'No-show', 'Postponed', 'Emergency'];

export const planStatuses = ['Proposed', 'Approved', 'In Progress', 'Completed', 'Cancelled'];

export const invoiceStatuses = ['Paid', 'Partially Paid', 'Unpaid', 'Cancelled'];

export const paymentMethods = ['Cash', 'Bank Transfer', 'Card', 'Installments', 'Insurance'];

export const expenseCategories = ['Medical Materials', 'Rent', 'Salaries', 'Equipment', 'Maintenance', 'Sterilization', 'Laboratories', 'General'];

export const labStatuses = ['Sent', 'In Progress', 'Ready', 'Received', 'Installed'];
