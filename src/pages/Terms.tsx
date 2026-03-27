import { motion } from "motion/react";

export default function Terms() {
  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-dark mb-4">Termos e Políticas</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Última atualização: 27 de Março de 2026
          </p>
        </motion.div>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-12">
          <section>
            <h2 className="text-3xl font-black text-dark mb-6">1. Termos de Uso</h2>
            <p>
              Ao acessar o site Donut – Cursos & Treinamentos, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-dark mb-6">2. Uso de Licença</h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Donut – Cursos & Treinamentos, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Donut – Cursos & Treinamentos;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black text-dark mb-6">3. Isenção de Responsabilidade</h2>
            <p>
              Os materiais no site da Donut – Cursos & Treinamentos são fornecidos 'como estão'. Donut – Cursos & Treinamentos não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-dark mb-6">4. Política de Privacidade</h2>
            <p>
              A sua privacidade é importante para nós. É política do Donut – Cursos & Treinamentos respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Donut – Cursos & Treinamentos, e outros sites que possuímos e operamos.
            </p>
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black text-dark mb-6">5. Cookies</h2>
            <p>
              Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
