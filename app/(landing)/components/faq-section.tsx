import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question:
        "¿Qué requisitos se necesitan para ingresar a los alojamientos?",
      answer:
        "Para garantizar la seguridad y cumplir con la normativa vigente en Perú, es obligatorio presentar un documento de identidad original (DNI, Carnet de Extranjería o Pasaporte). Este requisito es indispensable para registrar la mayoría de edad de todos los huéspedes.",
    },
    {
      question: "¿Cuál es el rango de precios para una estancia corta en Lima?",
      answer:
        "Las tarifas varían según la ubicación y las comodidades de la suite. Generalmente, puedes encontrar opciones confortables desde los S/ 40, mientras que las habitaciones premium con servicios de hidromasaje o saunas pueden alcanzar los S/ 250 o más.",
    },
    {
      question: "¿Qué tipos de servicios adicionales suelen ofrecer?",
      answer:
        "Muchos establecimientos cuentan con amenidades diseñadas para el confort y la relajación, como sistemas de climatización, conexión Wi-Fi de alta velocidad, Smart TV con servicios de streaming, estacionamiento privado y suites temáticas con mobiliario especializado.",
    },
    {
      question: "¿Cómo puedo elegir la mejor opción en mi distrito?",
      answer:
        "Te recomendamos utilizar nuestros filtros de búsqueda para seleccionar alojamientos por ubicación, servicios específicos. Esto te permitirá encontrar un lugar que se ajuste perfectamente a tus necesidades de privacidad y comodidad.",
    },
  ];

  return (
    <section className="pt-16 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-8 text-center">
          Preguntas Frecuentes
        </h2>

        <Accordion type="single" collapsible className="space-y-4" defaultValue="item-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 px-5"

            >
              <AccordionTrigger className="text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
