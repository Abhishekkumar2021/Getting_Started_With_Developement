#include <curl/curl.h>
#include <iostream>
#include <string>
using namespace std;

size_t WriteCallback(void* contents, size_t size, size_t nmemb, string* userp) {
    userp->append(static_cast<char*>(contents), size * nmemb);
    return size * nmemb;
}

pair<CURLcode, string> GetRequest(const string& url){
    CURL* curl;
    CURLcode res;
    string response;

    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

        res = curl_easy_perform(curl);

        curl_easy_cleanup(curl);
        return {res, response};
    }else{
        return {CURLE_FAILED_INIT, ""};
    }
} 

int main(int argc, char* argv[]) {
    vector<string> args(argv, argv + argc);
    if(args.size() < 2){
        cout << "Usage: " << args[0] << " <url>" << endl;
        return 1;
    }
    pair<CURLcode, string> response = GetRequest(args[1]);
    if(response.first == CURLE_FAILED_INIT){
        cout << "Failed to initialize curl" << endl;
    }else if(response.first != CURLE_OK){
        cout << "Failed to get the request. Error: " << curl_easy_strerror(response.first) << endl;
    }else{
        cout << "Response: " << response.second << endl;
    }
    return 0;
}