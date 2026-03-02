const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.analyzeResumeAndJD = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an expert resume analyst. Analyze the following resume against a job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription || 'No specific job description provided'}

Provide your analysis in the following JSON format:
{
  "atsScore": <0-100>,
  "experienceScore": <0-100>,
  "skillMatch": <0-100>,
  "matchedKeywords": [array of matched skills/keywords],
  "missingKeywords": [array of important missing keywords],
  "grammarIssues": [array of grammar/formatting issues],
  "suggestions": [array of improvement suggestions],
  "improvementTips": [array of actionable improvement tips]
}

Make sure to return valid JSON only.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseText = response.data.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from OpenAI');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    // Return default analysis if AI fails
    return {
      atsScore: 0,
      experienceScore: 0,
      skillMatch: 0,
      matchedKeywords: [],
      missingKeywords: [],
      grammarIssues: ['Unable to analyze at this time'],
      suggestions: ['Please try again later'],
      improvementTips: []
    };
  }
};

exports.generateJobRecommendationPrompt = async (resumeText) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Based on this resume, suggest relevant job titles and required skills:

${resumeText}

Return JSON format:
{
  "suggestedJobTitles": [array of job titles],
  "requiredSkills": [array of skills to target],
  "careerPath": "suggested career progression"
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const responseText = response.data.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      suggestedJobTitles: [],
      requiredSkills: [],
      careerPath: ''
    };
  } catch (error) {
    console.error('Career suggestion error:', error);
    return {
      suggestedJobTitles: [],
      requiredSkills: [],
      careerPath: ''
    };
  }
};
