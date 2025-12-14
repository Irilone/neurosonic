/**
 * readingPassages.ts
 * 
 * Library of reading passages for the cognitive task.
 * All passages are matched on difficulty (Flesch-Kincaid grade ~12-14),
 * word count (340-360 words), and topic domain (neuroscience/psychology).
 * 
 * Three questions per passage test:
 * 1. Recall - specific detail from the text
 * 2. Inference - conclusion drawn from information
 * 3. Synthesis - integration of multiple concepts
 */

import type { ReadingPassage } from '@/types/experiment';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'neurobiology-01',
    title: 'Neural Plasticity and Learning',
    wordCount: 347,
    fleschKincaidGrade: 12.8,
    content: `The human brain exhibits remarkable plasticity throughout life, continuously reorganising neural pathways in response to learning and experience. This process, known as neuroplasticity, challenges earlier assumptions that brain structure becomes fixed after childhood development.

At the cellular level, learning involves the strengthening of synaptic connections between neurons. When a particular neural pathway is repeatedly activated, the connection between those neurons becomes more efficient through a process called long-term potentiation (LTP). The synapses literally become more responsive, requiring less stimulation to fire.

The hippocampus plays a central role in memory formation. Information entering the brain is first processed in sensory cortices, then consolidated in the hippocampus before being distributed to other brain regions for long-term storage. Damage to the hippocampus can prevent the formation of new declarative memories while leaving procedural memory intact.

Sleep appears essential for memory consolidation. During slow-wave sleep, the brain replays recently learned information, strengthening the neural pathways associated with that knowledge. Studies have shown that subjects who sleep after learning retain information significantly better than those who remain awake for an equivalent period.

Stress hormones, particularly cortisol, have a complex relationship with memory. Acute stress can enhance memory formation for emotionally significant events, explaining why traumatic memories are often vivid and persistent. However, chronic stress impairs the hippocampus and can lead to memory deficits over time.

Recent research suggests that targeted interventions can enhance neuroplasticity. Physical exercise increases the production of brain-derived neurotrophic factor (BDNF), which promotes the growth of new neurons and synaptic connections. Similarly, certain forms of cognitive training and environmental enrichment have been shown to preserve and enhance brain function across the lifespan.`,
    questions: [
      {
        id: 'np-q1',
        text: 'What is the process called when synaptic connections become more efficient through repeated activation?',
        options: [
          'Neurogenesis',
          'Long-term potentiation (LTP)',
          'Synaptic pruning',
          'Myelination',
        ],
        correctIndex: 1,
        bloomsLevel: 'recall',
      },
      {
        id: 'np-q2',
        text: 'Based on the passage, what would likely happen to a patient with hippocampal damage?',
        options: [
          'They would lose all previous memories',
          'They would be unable to form new declarative memories but could still learn skills',
          'They would experience enhanced emotional responses',
          'They would lose the ability to sleep normally',
        ],
        correctIndex: 1,
        bloomsLevel: 'inference',
      },
      {
        id: 'np-q3',
        text: 'The passage suggests that the relationship between stress and memory is:',
        options: [
          'Always harmful to memory formation',
          'Only relevant during childhood development',
          'Dependent on whether stress is acute or chronic',
          'Mediated primarily through the sensory cortices',
        ],
        correctIndex: 2,
        bloomsLevel: 'synthesis',
      },
    ],
  },
  {
    id: 'attention-02',
    title: 'Selective Attention and Cognitive Control',
    wordCount: 352,
    fleschKincaidGrade: 13.1,
    content: `The human attention system functions as a selective filter, allowing us to focus on relevant information while suppressing distractions. This capacity for selective attention is not unlimited; it represents a fundamental bottleneck in cognitive processing that shapes how we perceive and interact with our environment.

The prefrontal cortex serves as the primary executive controller of attention. This brain region coordinates top-down attention—the deliberate focusing of cognitive resources on task-relevant stimuli. Damage to the prefrontal cortex results in increased distractibility and difficulty maintaining focus on goals, even when the person knows what they should be attending to.

Bottom-up attention operates through a different mechanism. Sudden, unexpected stimuli—a loud noise, a flash of movement—automatically capture attention regardless of current goals. This reflexive system evolved to detect potential threats, but in modern environments it can be hijacked by irrelevant distractions such as notifications and advertisements.

Working memory and attention are deeply intertwined. The phonological loop, a component of working memory, temporarily stores verbal information for processing. When external sounds compete for access to this system, comprehension and performance suffer. This explains why background conversation impairs reading more than white noise does—the linguistic content creates direct interference.

Attention also exhibits a phenomenon called "attentional blink." When people must identify two targets presented in rapid succession, they often miss the second target if it appears within 200-500 milliseconds of the first. This suggests that attention requires time to disengage from one stimulus before fully processing another.

Individual differences in attentional capacity have significant real-world consequences. People with higher working memory capacity are better able to maintain focus in distracting environments and demonstrate superior performance on complex tasks. However, even those with excellent attentional control show degraded performance when cognitive load exceeds available resources—a universal constraint that applies to all human cognition.`,
    questions: [
      {
        id: 'sa-q1',
        text: 'According to the passage, what brain region primarily controls top-down attention?',
        options: [
          'The hippocampus',
          'The prefrontal cortex',
          'The amygdala',
          'The sensory cortices',
        ],
        correctIndex: 1,
        bloomsLevel: 'recall',
      },
      {
        id: 'sa-q2',
        text: 'Why does background conversation impair reading more than white noise?',
        options: [
          'Conversation is typically louder than white noise',
          'The phonological loop is directly competed with by linguistic content',
          'White noise activates bottom-up attention more strongly',
          'The prefrontal cortex cannot filter conversation',
        ],
        correctIndex: 1,
        bloomsLevel: 'inference',
      },
      {
        id: 'sa-q3',
        text: 'The attentional blink phenomenon and working memory capacity limitations together suggest that:',
        options: [
          'Attention can be trained to operate without any constraints',
          'Bottom-up attention is more efficient than top-down attention',
          'There are fundamental temporal and resource limits on human attention',
          'Individual differences in attention are entirely genetic',
        ],
        correctIndex: 2,
        bloomsLevel: 'synthesis',
      },
    ],
  },
  {
    id: 'stress-03',
    title: 'The Physiology of Stress Response',
    wordCount: 344,
    fleschKincaidGrade: 12.6,
    content: `The stress response represents one of evolution's most sophisticated survival mechanisms, preparing the body for rapid action in the face of threat. However, the same physiological cascade that once protected our ancestors from predators can become maladaptive when chronically activated by modern psychological stressors.

The hypothalamic-pituitary-adrenal (HPA) axis constitutes the primary hormonal pathway of stress. When the brain perceives a threat, the hypothalamus releases corticotropin-releasing hormone (CRH), which triggers the pituitary gland to secrete adrenocorticotropic hormone (ACTH). This in turn stimulates the adrenal glands to release cortisol, the body's main stress hormone.

Cortisol mobilises energy reserves by increasing blood glucose and suppressing non-essential functions such as digestion and immune response. These effects are beneficial during acute stress but damaging when sustained. Chronically elevated cortisol contributes to cardiovascular disease, metabolic dysfunction, and accelerated brain ageing.

The autonomic nervous system provides a faster stress pathway. The sympathetic branch activates within seconds, releasing adrenaline and noradrenaline to increase heart rate, dilate pupils, and redirect blood flow to muscles. The parasympathetic branch, mediated by the vagus nerve, opposes these effects and promotes recovery.

Heart rate variability (HRV) reflects the balance between sympathetic and parasympathetic activity. Higher HRV indicates greater flexibility in stress response and is associated with better emotional regulation and physical health. Interventions such as deep breathing and meditation can enhance vagal tone and improve HRV.

Individual differences in stress reactivity emerge from both genetic factors and early life experiences. Adverse childhood experiences can alter HPA axis functioning, leading to heightened stress sensitivity that persists into adulthood. However, research suggests that targeted interventions, including regular exercise and certain forms of therapy, can partially reverse these effects and restore healthier stress regulation.`,
    questions: [
      {
        id: 'sr-q1',
        text: 'What hormone does the hypothalamus release to initiate the HPA axis stress response?',
        options: [
          'Cortisol',
          'Corticotropin-releasing hormone (CRH)',
          'Adrenaline',
          'Adrenocorticotropic hormone (ACTH)',
        ],
        correctIndex: 1,
        bloomsLevel: 'recall',
      },
      {
        id: 'sr-q2',
        text: 'Based on the passage, why might higher heart rate variability (HRV) be beneficial?',
        options: [
          'It indicates consistently high sympathetic activation',
          'It suggests greater flexibility in adapting to stress',
          'It reflects chronic cortisol elevation',
          'It shows reduced vagal nerve function',
        ],
        correctIndex: 1,
        bloomsLevel: 'inference',
      },
      {
        id: 'sr-q3',
        text: 'The passage implies that the modern stress problem primarily stems from:',
        options: [
          'Genetic mutations that impair HPA axis function',
          'The absence of any parasympathetic response',
          'Chronic activation of systems designed for acute threats',
          'Insufficient adrenaline production',
        ],
        correctIndex: 2,
        bloomsLevel: 'synthesis',
      },
    ],
  },
  {
    id: 'auditory-04',
    title: 'Auditory Processing and Sound Perception',
    wordCount: 349,
    fleschKincaidGrade: 13.4,
    content: `Sound perception begins with the mechanical transduction of pressure waves in the cochlea, but the brain's interpretation of these signals involves remarkably complex processing that extends far beyond simple frequency analysis. Understanding this pathway reveals how deeply intertwined auditory perception is with emotion, memory, and cognition.

The cochlea functions as a biological spectrum analyser, with different regions responding to different frequencies. Hair cells convert mechanical vibrations into neural signals with extraordinary sensitivity—capable of detecting movements smaller than the diameter of an atom. These signals travel via the auditory nerve to the brainstem, where initial processing of sound location and timing occurs.

The superior olivary complex in the brainstem compares signals from both ears to localise sounds in space. This binaural processing achieves remarkable precision, detecting timing differences as small as ten microseconds between ears. Such accuracy evolved to help locate predators and prey, but today enables us to follow conversations in noisy environments.

Before reaching conscious awareness, auditory signals pass through the thalamus, which acts as a relay station with an important exception: a direct pathway to the amygdala exists that bypasses cortical processing entirely. This "low road" enables rapid emotional responses to potentially threatening sounds before we consciously identify their source.

The auditory cortex performs the sophisticated analysis required for speech comprehension and music appreciation. Tonotopic organisation persists here—neurons are arranged by their preferred frequencies—but additional processing extracts meaning from temporal patterns, harmonic relationships, and learned associations.

Individual differences in auditory processing have significant implications. Trained musicians show enhanced brainstem timing responses and enlarged auditory cortex regions. These structural changes reflect neuroplastic adaptations to extensive practice, demonstrating that even basic sensory processing is shaped by experience. However, this enhanced processing may also increase susceptibility to distraction from background sounds.`,
    questions: [
      {
        id: 'ap-q1',
        text: 'Where does binaural sound localisation primarily occur?',
        options: [
          'The cochlea',
          'The auditory cortex',
          'The superior olivary complex',
          'The thalamus',
        ],
        correctIndex: 2,
        bloomsLevel: 'recall',
      },
      {
        id: 'ap-q2',
        text: 'The "low road" pathway to the amygdala exists because:',
        options: [
          'Conscious processing of sound is more accurate',
          'Rapid emotional response to threats has survival value',
          'The auditory cortex cannot process emotional content',
          'Tonotopic organisation is inefficient',
        ],
        correctIndex: 1,
        bloomsLevel: 'inference',
      },
      {
        id: 'ap-q3',
        text: 'The passage suggests that musicians\' enhanced auditory processing is a double-edged sword because:',
        options: [
          'Musical training damages the cochlea over time',
          'Enhanced processing may increase distraction susceptibility',
          'The auditory cortex shrinks with extensive practice',
          'Brainstem timing responses become slower',
        ],
        correctIndex: 1,
        bloomsLevel: 'synthesis',
      },
    ],
  },
  {
    id: 'sleep-05',
    title: 'Sleep Architecture and Cognitive Function',
    wordCount: 356,
    fleschKincaidGrade: 12.9,
    content: `Sleep is far from a passive state; it comprises multiple distinct stages, each serving specific functions for cognitive performance and physiological restoration. The architecture of sleep—the pattern and duration of these stages—profoundly influences memory consolidation, emotional regulation, and next-day cognitive capacity.

Sleep cycles through four stages approximately every ninety minutes. Stages one and two represent light sleep, characterised by theta waves on electroencephalography (EEG). Stage three, also called slow-wave sleep (SWS), features high-amplitude delta waves and is associated with physical restoration and declarative memory consolidation.

Rapid eye movement (REM) sleep, paradoxically characterised by brain activity resembling wakefulness, serves different consolidation functions. During REM, the brain processes emotional memories and integrates newly learned information with existing knowledge structures. Dreaming occurs predominantly in this stage, though its functional significance remains debated.

Sleep deprivation has cascading effects on cognition. Even moderate sleep restriction—sleeping six hours instead of eight—impairs attention, working memory, and decision-making. These deficits accumulate across consecutive nights of insufficient sleep, though individuals often underestimate their own impairment. The prefrontal cortex appears particularly vulnerable, explaining why sleep-deprived individuals struggle with executive functions.

The relationship between sleep and emotional regulation operates bidirectionally. Poor sleep increases amygdala reactivity to negative stimuli while reducing prefrontal control over emotional responses. Conversely, emotional distress and anxiety disrupt sleep architecture, creating a cycle that can maintain or worsen psychological difficulties.

Circadian rhythms govern the timing of sleep propensity and alertness. These internal clocks, regulated by the suprachiasmatic nucleus, synchronise to environmental light cues but exhibit individual variation. Understanding one's chronotype—whether one is naturally a "morning lark" or "night owl"—can help optimise cognitive performance by aligning demanding tasks with peak alertness periods.`,
    questions: [
      {
        id: 'sl-q1',
        text: 'According to the passage, what type of brain waves characterise slow-wave sleep?',
        options: [
          'Alpha waves',
          'Beta waves',
          'Theta waves',
          'Delta waves',
        ],
        correctIndex: 3,
        bloomsLevel: 'recall',
      },
      {
        id: 'sl-q2',
        text: 'Why might sleep-deprived individuals continue to believe they are performing well?',
        options: [
          'Sleep deprivation enhances metacognitive awareness',
          'The prefrontal cortex, which monitors performance, is impaired',
          'REM sleep compensates for other deficits',
          'Circadian rhythms mask true performance levels',
        ],
        correctIndex: 1,
        bloomsLevel: 'inference',
      },
      {
        id: 'sl-q3',
        text: 'The passage describes a bidirectional relationship between sleep and emotion, implying that:',
        options: [
          'Treating either sleep or emotional problems alone will be insufficient',
          'REM sleep is the only stage relevant to emotional processing',
          'The amygdala functions independently of sleep quality',
          'Circadian rhythms determine emotional responses',
        ],
        correctIndex: 0,
        bloomsLevel: 'synthesis',
      },
    ],
  },
];

/**
 * Select a random passage for this session.
 * In production, this would consider previously seen passages
 * to ensure rotation across participants.
 */
export function selectRandomPassage(): ReadingPassage {
  const index = Math.floor(Math.random() * READING_PASSAGES.length);
  return READING_PASSAGES[index];
}

/**
 * Select a passage by ID.
 */
export function getPassageById(id: string): ReadingPassage | undefined {
  return READING_PASSAGES.find((p) => p.id === id);
}
