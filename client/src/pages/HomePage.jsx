import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import HeroSection from '../components/home/HeroSection';
import ContactInfoBar from '../components/home/ContactInfoBar';
import ContactSection from '../components/home/ContactSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import DeliverySection from '../components/home/DeliverySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';

const HomePage = () => (
  <>
    <Helmet>
      <title>Lohitha Murmura — Factory Fresh Murmura Wholesale Supplier | Siddipet, Telangana</title>
      <meta name="description" content="Premium murmura manufacturer in Siddipet supplying wholesalers, retailers and distributors across Telangana. Bulk orders: 50, 100, 150, 200+ bags. Call +91 9848684411." />
      <meta name="keywords" content="murmura wholesale, puffed rice bulk, murmura factory Siddipet, murmura supplier Telangana, bulk murmura order" />
    </Helmet>
    <motion.div {...pageTransition}>
      <HeroSection />
      <ContactInfoBar />
      <FeaturedProducts />
      <AboutSection />
      <WhyChooseUs />
      <DeliverySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </motion.div>
  </>
);

export default HomePage;
