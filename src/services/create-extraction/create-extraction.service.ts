import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/env/env.service';
import OpenAI from 'openai';

@Injectable()
export class CreateExtractionService {
  private apiKey: string;
  private openai: OpenAI;

  constructor(private readonly envService: EnvService) {
    this.apiKey = envService.get('OPENAI_API_KEY');
    this.openai = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  async generateText(prompt: string) {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Você é especialista em extrair o conteúdo das fotos de nostas fiscais. 
          Os textos que serão enviados para você foram textos extraídos de notas fiscais, o que pode gerar transcrições incorretas. 
          Dessa forma, reescreva o conteúdo da nota fiscal com o que faz sentido que esteja escrito, além de corrigir possíveis erros gramaticais e ortográficos.
          Além disso, gere um título para a nota fiscal e, caso ache que seja interessante, adicione informações extras que julgar relevantes. 
          Por fim, me forneça somente um JSON no seguinte formato, colocando em formato de tabela com tags html, separando as linhas por tópicos e quebra de linha somente no campo "content" e "extra_informations" do JSON,
          para que o texto seja formatado corretamente no site : {title: "Título do texto", content: "Conteúdo corrigido", extra_informations: "Informações extras" }. Devolva somente o JSON, sem nenhum outro caracter ou informação adicional para não prejudicar o fluxo do código.
          Nas informações extras, coloque uma breve análise se os valores estão de acordo com o esperado com base no que foi escrito na nota fiscal.`,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4o-mini',
    });
    return JSON.parse(completion.choices[0].message.content);
  }
}
