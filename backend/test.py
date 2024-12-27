#  Fundamental concept of GPT2 Integration 
from transformers import GPT2LMHeadModel, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("gpt2-large")
model = GPT2LMHeadModel.from_pretrained("gpt2-large")

tokenizer.decode(tokenizer.eos_token_id)

sentence = "Give one line of advice for a person with negotiation with skill of 5 out of 10"
input_ids = tokenizer.encode(sentence, return_tensors='pt')

output = model.generate(input_ids, max_length=150, num_beams=5, no_repeat_ngram_size=2, early_stopping=True)

text = tokenizer.decode(output[0], skip_special_tokens=True)

print(text)

