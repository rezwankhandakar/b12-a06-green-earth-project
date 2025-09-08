
1) What is the difference between var, let, and const?
    
    var - function scoped, re-declare ও re-assign করা যায় 
    let - block scoped, re-declare করা যায় না, re-assign করা যায়
    const - block scoped, re-declare করা যায় না, re-assign করা যায় না

2) What is the difference between map(), forEach(), and filter()?
    
    forEach() - শুধু লুপ চালায়, কিছু return করে না।
    map() - প্রতিটা আইটেমকে পরিবর্তন করে নতুন array return করে।
    filter() - শর্ত মেনে যেগুলো true, শুধু সেগুলো নিয়ে নতুন array return করে।

3) What are arrow functions in ES6?
    
    Arrow function হলো ES6 এ introduce করা function লেখার ছোট ও আধুনিক সিনট্যাক্স।

4) How does destructuring assignment work in ES6?
   
    Destructuring assignment হলো ES6 এর একটা ফিচার যেটা দিয়ে array বা object থেকে আলাদা আলাদা ভ্যারিয়েবল সহজে বের করে আনা যায়।

5) Explain template literals in ES6. How are they different from string concatenation?

    Template literals হলো ES6 এ string লেখার নতুন পদ্ধতি। এগুলো backtick (`) দিয়ে লেখা হয়।
    Concatenation - + ব্যবহার করে, পড়তে কষ্ট হয়।
    Template literals - backtick (`) + ${ } দিয়ে সহজে ভ্যারিয়েবল/এক্সপ্রেশন বসানো যায় + multi-line সাপোর্ট করে।