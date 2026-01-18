# GTL Event Playground - New Editable JSON Flow

## Overview
The Event Playground has been completely restructured to provide a more flexible, API-testing-tool-like experience where users can edit JSON payloads before sending them.

## Changes Made

### 1. ✅ Removed All `test_mode` References
**File:** `app/ga4-client/standard-events/page.tsx`

- Removed `test_mode: "broken"` from all 14 broken payloads
- Removed `test_mode: "fixed"` from all 14 fixed payloads
- **Total:** 28 occurrences removed

Clean payloads now look like:
```typescript
fixedPayload: {
  page_location: "https://example.com/page",
  page_title: "Test Page",
  page_referrer: ""
}
```

### 2. ✅ Complete Playground Restructure
**File:** `components/event-playground.tsx`

#### **New User Flow:**

```
1. Click event button (e.g., "purchase")
   ↓
2. JSON Builder populates with event payload
   ↓
3. User edits the JSON (add/remove/modify fields)
   ↓
4. Click "Send Request" button
   ↓
5. Network Inspector shows Request & Response
   ↓
6. Event History logs the sent event
```

#### **Key Features:**

##### A. **Editable JSON Builder** (New Section)
- **Location:** Above Network Inspector
- **Functionality:**
  - Click any event button → populates JSON in editor
  - Full `<textarea>` for editing JSON
  - Real-time JSON validation with error messages
  - Selected event is highlighted with orange border
  - Copy and Clear buttons

##### B. **Send Request Button**
- Only sends when clicked (events don't auto-send anymore)
- Disabled when:
  - JSON is invalid
  - No JSON entered
  - Request is in progress
- Shows loading state: "Sending..."

##### C. **Network Inspector** (Simplified)
- **Only 2 tabs now:** Request & Response
- **Removed:** "Live JSON Build" tab (now standalone above)
- Shows after sending a request
- Full request/response details with copy buttons

##### D. **Event History** (Enhanced)
- Logs all sent events
- Shows payload and response for each
- No horizontal scrolling (text wraps)
- Collapsible payload/response views

### 3. ✅ UI Layout

```
┌─────────────────────────────────────────────────┐
│ 📊 Test Events (14 buttons in grid)             │
│ Click to populate JSON editor                   │
└─────────────────────────────────────────────────┘
              ↓ (Click event)
┌─────────────────────────────────────────────────┐
│ 📝 JSON Builder                 [Copy] [Clear]  │
│ ┌───────────────────────────────────────────┐  │
│ │ {                                          │  │
│ │   "page_location": "...",                 │  │
│ │   "page_title": "...",                    │  │
│ │   ...                                      │  │
│ │ }                                          │  │
│ └───────────────────────────────────────────┘  │
│ [Send Request]                                  │
└─────────────────────────────────────────────────┘
              ↓ (Click Send)
┌─────────────────────────────────────────────────┐
│ 🔍 Network Inspector                            │
│ [Request] [Response]                            │
│ Shows after sending                             │
└─────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────┐
│ 📋 Event History                                │
│ All sent events with payloads & responses       │
└─────────────────────────────────────────────────┘
```

## Technical Changes

### State Management

**New State Variables:**
```typescript
const [selectedEventName, setSelectedEventName] = useState<string>("")
const [editableJson, setEditableJson] = useState<string>("")
const [jsonError, setJsonError] = useState<string>("")
```

**Removed State:**
```typescript
// No longer needed:
// - mode ("broken" | "fixed")
// - selectedEvent (replaced with selectedEventName)
```

### Event Flow

**Old Flow:**
```typescript
handleEventClick() {
  → immediately sends event
  → shows results
}
```

**New Flow:**
```typescript
handleEventClick() {
  → populate JSON editor
  → wait for user to edit
}

handleSendRequest() {
  → validate JSON
  → send to server
  → show results
}
```

### JSON Validation

```typescript
const validateJson = (): any | null => {
  try {
    const parsed = JSON.parse(editableJson)
    setJsonError("") // Clear error
    return parsed
  } catch (error) {
    setJsonError(error.message) // Show error
    return null
  }
}
```

- Validates on blur (when user leaves textarea)
- Validates before sending
- Shows clear error messages with red border

## Visual Indicators

### JSON Editor States

1. **Valid JSON:**
   - ✅ Green border (`border-[#34A853]/20`)
   - Green text
   - Send button enabled

2. **Invalid JSON:**
   - ❌ Red border (`border-[#EA4335]/50`)
   - Red text
   - Error message below
   - Send button disabled

3. **Selected Event:**
   - Orange border on event button
   - Event name badge in JSON Builder

## Benefits

### ✅ **More Control**
- Users can modify any field before sending
- Test edge cases and broken payloads manually
- Experiment with different parameter combinations

### ✅ **Better Learning**
- See exactly what JSON is being sent
- Understand event structure
- Learn by experimentation

### ✅ **Professional UX**
- Similar to Postman, Insomnia, etc.
- Clear separation: Prepare → Send → Inspect
- No surprises (events don't auto-send)

### ✅ **Cleaner Code**
- Removed unused mode toggle logic
- Removed `test_mode` polluting payloads
- Simplified component structure

## Examples

### Example 1: Send Standard Event

1. Click "purchase" button
2. JSON appears:
   ```json
   {
     "transaction_id": "T_123456789",
     "value": 149.99,
     "currency": "USD",
     "tax": 12.00,
     "shipping": 5.00,
     "items": [...]
   }
   ```
3. Edit if needed (e.g., change value to 199.99)
4. Click "Send Request"
5. See Request/Response in Network Inspector

### Example 2: Test Broken Payload

1. Click "add_to_cart" button
2. JSON appears with proper structure
3. Manually delete the `items` array
4. Click "Send Request"
5. See 400 error in Response tab showing validation error

### Example 3: Add Custom Parameters

1. Click any event
2. Add custom parameters to JSON:
   ```json
   {
     "page_location": "...",
     "custom_param_1": "test_value",
     "user_segment": "premium"
   }
   ```
3. Send and see custom params in Request tab

## Compatibility

### ✅ **All Features Still Work:**
- Client-side tracking (gtag.js)
- Server-side tracking (Measurement Protocol)
- Event History logging
- Request/Response inspection
- Copy to clipboard
- Error handling
- Loading states

### ✅ **No Breaking Changes:**
- Standard events page still works
- All 14 events load correctly
- API route unchanged
- Network Inspector functional

## Testing Checklist

- [x] No linter errors
- [x] TypeScript compiles successfully
- [x] JSON validation works
- [x] Send button enables/disables correctly
- [x] Network Inspector shows after sending
- [x] Event History logs correctly
- [x] All 14 events load properly
- [x] Copy buttons work
- [x] Error messages display
- [x] No horizontal scrolling
- [x] Selected event highlights

## Result

The GTL Event Playground now provides a **professional API testing experience** where users have full control over the JSON payload before sending, making it perfect for:

- 🎓 **Learning** GA4 event structure
- 🧪 **Testing** different payload combinations  
- 🐛 **Debugging** event validation issues
- 📝 **Documenting** event implementations

**The new flow is more intuitive, more powerful, and cleaner!** 🚀
