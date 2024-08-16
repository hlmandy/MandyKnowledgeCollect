## Join
```cpp
string join(const string& delimiter, const vector<string>& vec) {
    if(vec.empty()) return "";
    ostringstream oss;
    oss << vec[0];
    for(size_t i = 1; i < vec.size(); ++i) oss << delimiter << vec[i];
    return oss.str();
}

template <typename T>
string join(const string& delimiter, const vector<T>& vec, function<string(const T&)> toStringFunc) {
    // usage: join<int>(" | ", numbers, [](const int& num) {return to_string(num);})
    if(vec.empty()) return "";
    ostringstream oss;
    oss << toStringFunc(vec[0]);
    for(size_t i = 1; i < vec.size(); ++i)oss << delimiter << toStringFunc(vec[i]); // 调用函数
    return oss.str();
}

template <typename T, typename MemberFunc>
string join(const string& delimiter, const vector<T>& vec, MemberFunc toStringFunc) {
    // usage: string result = join(" | ", people, &Person::getName);
    static_assert(is_member_function_pointer_v<MemberFunc>, "Func must be a member function pointer");
    if(vec.empty()) return "";
    ostringstream oss;
    oss << (vec[0].*toStringFunc)();
    for(size_t i = 1; i < vec.size(); ++i) oss << delimiter << (vec[i].*toStringFunc)(); // 调用对象的方法
    return oss.str();
}
```

## Split
```cpp
vector<string> split(const string& line, char delimiter = ',') {
	vector<string> results;
	istringstream ss(line);
	string item;
	while(getline(ss, item, delimiter)) results.push_back(item);
	return results;
}

vector<string> split(const string& line, const string& delimiter = ",") {
	vector<string> results;
	regex re(delimiter);
	sregex_token_iterator it(line.begin(), line.end(), re, -1);
	sregex_token_iterator end;
	for(; it != end; ++it) results.push_back(*it);
	return results;
}

vector<string> split_v2(const string& line, const string& delimiter = ",") {
    vector<string> results;
    regex re(delimiter);
    sregex_token_iterator it(line.begin(), line.end(), re, -1);
    sregex_token_iterator end;
    for(; it != end; ++it) results.push_back(*it);
    return results;
}
```

## Read csv/tsv/txt
```cpp
// split version
vector<vector<string>> readInput(const string& filepath, char delimiter = ',', int header_line_count = 1) {
    cout << "Reading file:" << filepath << endl;
    //open the file
    ifstream file(filepath.c_str());
    //check open status
    if(!file.is_open()) throw runtime_error("Fail to open file: " + filepath);
    //skip headers (default: the first line)
    string line;
    for(int i = 0; i < header_line_count; ++i) getline(file, line);
    //read data by line
    vector<vector<string>> data;
    while(getline(file, line)) data.push_back(split(line, delimiter));
    //close the file
    file.close();
    return data;
}

// no split version
vector<vector<string>> readInput(const string& filepath, char delimiter = ',', int header_line_count = 1) {
    cout << "Reading file:" << filepath << endl;
    //open the file
    ifstream file(filepath.c_str());
    //check open status
    if(!file.is_open()) throw runtime_error("Fail to open file: " + filepath);
    //skip headers (default: the first line)
    string line;
    for(int i = 0; i < header_line_count; ++i) getline(file, line);
    //read data
    vector<vector<string>> data;
    while(getline(file, line)) {
        vector<string> row;
        istringstream ss(line);
        string cell;
        while(getline(ss, cell, delimiter)) row.push_back(cell);
        data.push_back(row);
    }
    //close the file
    file.close();
    return data;
}
```

## Read .ini configuration
```cpp
map<string, map<string, string>> readConfig(const string& filepath) {
    map<string, map<string, string>> config;
    string currentSection;
    ifstream configFile(filepath);
    if(!configFile.is_open()) throw invalid_argument("Could not open the config file: " + filepath);
    string line;
    while(getline(configFile, line)) {
        // Trim leading and trailing whitespaces
        line.erase(0, line.find_first_not_of(" \t"));
        line.erase(line.find_last_not_of(" \t") + 1);
        // Skip empty lines or comments
        if(line.empty() || line[0] == ';' || line[0] == '#') continue;
        // Check if it is a section line
        if(line[0] == '[' && line[line.length() - 1] == ']')
            currentSection = line.substr(1, line.length() - 2); // extract section name
        else {
            // Extract key-value pairs
            istringstream lineStream(line);
            string key, value;
            if(getline(lineStream, key, '=') && getline(lineStream, value)) {
                // Trim leading and trailing whitespaces for key and value
                key.erase(0, key.find_first_not_of(" \t"));
                key.erase(key.find_last_not_of(" \t") + 1);
                value.erase(0, value.find_first_not_of(" \t"));
                value.erase(value.find_last_not_of(" \t") + 1);
                // Store in the map
                config[currentSection][key] = value;
            }
        }
    }
    configFile.close();
    return config;
}
```